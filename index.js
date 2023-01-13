const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const getElement = await getContactById(id);
      console.table(getElement);
      break;

    case "add":
      await addContact(name, email, phone);
      console.log(`added contact ${name}`);
      break;

    case "remove":
      await removeContact(id);
      console.log(id, "deleted");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
