import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, from, map, tap } from "rxjs";
import { Preferences } from "@capacitor/preferences";
import { environment as devEnvironment } from "src/environments/environment";
import { User } from "src/app/models/user/user.model";

interface Auth {
  id: number;
  token: string;
  expiresIn: Date;
}
interface authData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private ENV = devEnvironment;
  private user = new BehaviorSubject<User | null>(null);
  activeLogoutTimer: any;
  constructor(private http: HttpClient) {}

  authenticate(mode: boolean, data: authData) {
    let dataToSend = mode ? { email: data.email, password: data.password } : data;

    return this.http.post<any>(`${this.ENV.apiURL}/${mode ? "login" : "signup"}`, dataToSend).pipe(
      tap(response => {
        this.setAuthData(response?.data);
      }),
    );
  }

  private setAuthData(authData: Auth) {
    const expirationTime = new Date(new Date().getTime() + +authData.expiresIn * 1000);
    let userId = authData.id;

    const buildUser = new User(userId, authData.token, expirationTime);

    this.user.next(buildUser);
    this.storeAuthData(buildUser);
  }

  private storeAuthData = async (dataToStore: User) => {
    const data = JSON.stringify(dataToStore);

    await Preferences.set({
      key: "authData",
      value: data,
    });
  };

  private removeStoredData = async () => {
    await Preferences.remove({ key: "authData" });
  };

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  get userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map(user => {
        console.log(user);

        if (user) {
          return !!user.token;
        }
        return false;
      }),
    );
  }

  get userId() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        }
        return null;
      }),
    );
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.user.next(null);
    this.removeStoredData();
  }

  autoLogin() {
    return from(Preferences.get({ key: "authData" })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parseData = JSON.parse(storedData.value) as {
          id: number;
          _token: string;
          tokenExpirationDate: string;
        };

        const expirationTime = new Date(parseData.tokenExpirationDate);

        if (expirationTime <= new Date()) {
          return null;
        }
        const userToReturn = new User(parseData.id, parseData._token, expirationTime);
        return userToReturn;
      }),
      tap(user => {
        this.user.next(user);
        this.autoLogout(user!.tokenDuration);
      }),
      map(user => {
        return !!user;
      }),
    );
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
      //To clear any timeout, to prevent memory loop
    }
  }
}
