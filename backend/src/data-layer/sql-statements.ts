export const SQL_STATEMENTS = {
  initialiseDatabase: `
      CREATE TABLE IF NOT EXISTS user
      (
          username   VARCHAR(255) PRIMARY KEY,
          password   VARCHAR(255) NOT NULL,
          first_name VARCHAR(255) NOT NULL,
          last_name  VARCHAR(255) NOT NULL,
          ip_address VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at DATETIME
      );

      CREATE TABLE IF NOT EXISTS diary_page
      (
          page_id    UUID PRIMARY KEY,
          username   VARCHAR(255) NOT NULL,
          content    TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at DATETIME,
          FOREIGN KEY (username) REFERENCES user (username)
      );
  `,
  createUser: `
      INSERT INTO user (username, password, first_name, last_name, ip_address)
      VALUES (?, ?, ?, ?, ?)
  `,

  getUserPassword: `
      SELECT password
      FROM user
      WHERE username = ?
  `,
  getUser: `
      SELECT *
      FROM user
      WHERE username = ?
  `,
  createDiaryDocument: `
      INSERT INTO diary_page (page_id, username, content)
      VALUES (?, ?, ?);
  `,
  updateDiaryDocument: `
      UPDATE diary_page
      SET content = ?
      WHERE page_id = ?;
  `,
  getDiaryPageUsername: `
      SELECT username
      FROM diary_page
      WHERE page_id = ?`,
};
