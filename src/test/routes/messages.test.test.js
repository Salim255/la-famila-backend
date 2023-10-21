const request = require("supertest");

const buildApp = require("../../app");

const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

afterAll(() => {
  return context.close();
});

let createdUsersId = [];
let token;
let createdChatId;
describe("Chats test handler", () => {
  it("create  user 1", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "a@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(async response => {
        createdUsersId.push(response._body.data.user.id);

        token = response._body.data.token;
      });
  });

  it("create  user 2", async () => {
    await request(buildApp())
      .post(`/api/v1/users/signup`)
      .send({
        first_name: "salim",
        last_name: "hassan",
        email: "b@gmail.com",
        password: "3333",
      })
      .expect(200)
      .then(async response => {
        createdUsersId.push(response._body.data.user.id);
      });
  });

  it("create a chat", async () => {
    await request(buildApp())
      .post(`/api/v1/chats`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        chatType: "group",
        usersId: createdUsersId,
      })
      .expect(200)
      .then(async response => {
        createdChatId = response.body.data.chat_id;
      });
  });

  it("create message on chat", async () => {
    await request(buildApp())
      .post(`/api/v1/messages`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        chat_id: createdChatId,
        message: "Hello world!",
      })
      .expect(200);
  });

  it("get messages by chat id", async () => {
    await request(buildApp())
      .get(`/api/v1/chats/${createdChatId}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
