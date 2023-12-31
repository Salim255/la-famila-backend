/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(
    `
     CREATE TABLE  users (
        id SERIAL PRIMARY KEY ,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        first_name VARCHAR(30) ,

        last_name VARCHAR(30),

        photo VARCHAR(255)  ,

        email VARCHAR(50) NOT NULL UNIQUE,

        password VARCHAR NOT NULL,

        role VARCHAR(20) NOT NULL DEFAULT 'user' 
        
                  );
    `,
  );
};

//User belongs to many chats
//User has many chatUser
exports.down = pgm => {
  pgm.sql(`       DROP TABLE users;
      `);
};
