const validation = (input) => {
  console.log("Input for validation:", input);
  let errors = {};
  const regexText = /^[a-zA-Z]{1,20}$/;
  const regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  const currentDate = new Date().getFullYear();

  if (!input.forename || !regexText.test(input.forename)) {
    errors.forename = "Forename must contain only letters (max 20 characters)";
  }

  if (!input.surname || !regexText.test(input.surname)) {
    errors.surname = "Surname must contain only letters (max 20 characters)";
  }

  if (!input.nationality || !regexText.test(input.nationality)) {
    errors.nationality = "Nationality must contain only letters (max 20 characters)";
  }

  if (!input.dob || new Date(input.dob).getFullYear() < 1970) {
    errors.dob = "Date of birth should not be earlier than 1970";
  }

  if (input.description.length < 10 || input.description.length > 3000) {
    errors.description = "Description should be between 10 and 3000 characters";
  }

  if (!regexImage.test(input.image)) {
    errors.image = "Image URL is not valid";
  }

  if (!input.teams || input.teams.length === 0 || input.teams.length > 3) {
    errors.teams = "You must select 1 to 2 teams";
  } else {
    const allowedTeams = ["Red Bull", "Mercedes", "Ferrari", "McLaren", "Aston Martin", "Alphine", "Williams Stake", "Haas"];
    const invalidTeams = input.teams.filter(team => !allowedTeams.includes(team));
    if (invalidTeams.length > 0) {
      errors.teams = "Invalid team selection";
    }
  }

  console.log(errors);
  return errors;
};

export default validation;