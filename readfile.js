import * as fs from 'fs/promises';

function parseDate(dateString) {
  const [dd, mm, yyyy] = dateString.split("/");

  const date = new Date(`${yyyy}/${mm}/${dd}`);

  if (date.toString() === "Invalid Date") return "error";
  else return date.toLocaleString("pt-br");
}

async function main() {

  const teste = await fs.readFile("files/file2.csv", { encoding: "utf-8" })

  const [rawHeader, ...rawRows] = teste.split("\n");

  const header = rawHeader.split(",");
  const rows = rawRows.map(rawRow => rawRow.split(","))

  const people = [];
  const errors = [];

  for (let i = 0; i < rows.length; i += 1) {

    const row = rows[i];
    const [name, age, birthdayString] = row;

    const birthday = parseDate(birthdayString);

    if (birthday === "error") {
      errors.push(`Error when parsing birthday for ${name}. Will skip row ${i}`);
      continue;
    }
    
    const person = {
      name,
      age,
      birthday
    }

    people.push(person);
  }

  console.log(people)
}

main()