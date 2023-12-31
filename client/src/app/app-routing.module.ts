import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },

  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthPageModule),
  },
  {
    path: "tabs",
    loadChildren: () => import("./pages/tabs/tabs.module").then(m => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'profiles',
    loadChildren: () => import('./pages/profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
