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
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS diary_page
      (
          page_id    UUID PRIMARY KEY,
          username   VARCHAR(255) NOT NULL,
          title      VARCHAR(255) NOT NULL,
          content    TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          FOREIGN KEY (username) REFERENCES user (username)
      );

      CREATE TRIGGER IF NOT EXISTS diary_page_auto_updated_at
          AFTER UPDATE
          ON diary_page
      BEGIN
          UPDATE diary_page SET updated_at = CURRENT_TIMESTAMP WHERE page_id = NEW.page_id;
      END;

      CREATE TRIGGER IF NOT EXISTS user_auto_updated_at
          AFTER UPDATE
          ON user
      BEGIN
          UPDATE user SET updated_at = CURRENT_TIMESTAMP WHERE username = NEW.username;
      END;
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
  createDiaryPage: `
      INSERT INTO diary_page (page_id, username, title, content)
      VALUES (?, ?, ?, ?);
  `,
  updateDiaryPage: `
      UPDATE diary_page
      SET title   = ?,
          content = ?
      WHERE page_id = ?;
  `,
  getDiaryPageUsername: `
      SELECT username
      FROM diary_page
      WHERE page_id = ?
  `,
  deleteDiaryPage: `
      DELETE
      FROM diary_page
      WHERE page_id = ?;
  `,
  getDiaryPage: `
      SELECT page_id, username, title, content, datetime(created_at,'localtime') as created_at, datetime(updated_at,'localtime') as updated_at
      FROM diary_page
      WHERE page_id = ?;
  `,
  getDiaryPages: `
      SELECT page_id, username, title, content, datetime(created_at,'localtime') as created_at, datetime(updated_at,'localtime') as updated_at
      FROM diary_page
      WHERE username = ?
      ORDER BY updated_at DESC
      LIMIT ? OFFSET ?
  `,
  getDiaryPagesCount: `
      SELECT COUNT(*) as count
      FROM diary_page
      WHERE username = ?;
   `,
};
