// 1st alternative
const express = require("express");
const { contacts } = require("./model/index");
const { where } = require("sequelize");
const app = express();

// connecting database
require("./model/index");

// setting view engine to show ejs
app.set("view engine", "ejs");

// making node to support showing files from different directory
app.use(express.static("public"));

// form bata data aairaxa parse gara or handle gar vaneko ho
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// kaa hya bata suru vaxa mathi sabai importing haru xa

// create a contact
app.get("/create", (req, res) => {
  res.render("createContact");
});

app.post("/create", async (req, res) => {
  const { fullname, email, phone, about } = req.body;
  await contacts.create({
    fullname: fullname,
    email: email,
    phone: phone,
    about: about,
  });
  res.redirect("/");
});

// to show all contacts
app.get("/", async (req, res) => {
  const allContacts = await contacts.findAll();

  res.render("contacts", { everyContacts: allContacts });
});

// go to single contact
app.get("/single/:id", async (req, res) => {
  const id = req.params.id;

  const contact = await contacts.findAll({ where: { id: id } });

  res.render("singleContact", { contact: contact });
});

// render edit contact
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  // find contact of the specific id
  const contact = await contacts.findAll({ where: { id: id } });
  res.render("editContact", { contact: contact });
});

// post from edit contact
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { fullname, email, phone, about } = req.body;

  await contacts.update(
    {
      fullname: fullname,
      email: email,
      phone: phone,
      about: about,
    },
    { where: { id: id } }
  );

  res.redirect("/single/" + id);
});

// to delete contact
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await contacts.destroy({ where: { id: id } });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("NodeJS project has started at port 3000");
});
