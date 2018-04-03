module.exports = async function (db) {
    await db.sequelize.sync({force: true});
  
    await db.user.bulkCreate([
        {
            email: "q@q.q",
            password: "$2a$10$8uL7iZ/W.JgC8nxbVu6B/OQD3YXIrmAw4wgSBsElfcB0VgXaZc6pe",
            codes: "[12345,54321,44444,21543]"
        }
    ]);
  };