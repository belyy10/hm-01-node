const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const dbPath = path.join(__dirname, "db", "contacts.json");

async function readDb() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 4));
}

async function listContacts() {
  const db = await readDb();
  return db;
}

async function getContactById(contactId) {
  const db = await readDb();
  const findDb = db.find((contact) => contact.id === contactId);
  return findDb;
}

async function removeContact(contactId) {
  const db = await readDb();
  const updateDb = db.filter((contact) => contact.id !== contactId);
  await writeDb(updateDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readDb();
  db.push(contact);
  writeDb(db);
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
