const fs = require("node:fs");

const faker = require("faker");

(() => {
  const generateBooks = (count = 10) =>
    Array.from(Array(count).keys()).map((item) => ({
      id: item + 1,
      title: faker.lorem.words(),
      author: faker.name.findName(),
      publishedDate: faker.date.past(),
      editor: faker.name.findName(),
    }));

  fs.rmSync("backend", { force: true, recursive: true });
  fs.mkdirSync("backend");
  fs.writeFileSync(
    "backend/db.json",
    JSON.stringify({ books: generateBooks() }, null, 2)
  );
  console.log("Data generated and saved to db.json");

  fs.writeFileSync(
    "backend/routes.json",
    JSON.stringify(
      {
        "/api/v1/books": "/books",
        "/api/v1/books/:id": "/books/:id",
      },
      null,
      2
    )
  );
  console.log("Routes redirection generated and saved to routes.json");
})();
