import images from "images";

let folder = "./public/assets/img/turtle_components_gen";
let components = [
  "frontFeet",
  "hindFeet",
  "heads",
  "tails",
  "innerShells",
  "outerShells",
  "eyes",
];
let file_extension = ".png";
let total_components = components.length;
let images_per_component = 5;
let total_number_of_breeds = 10;

export async function generateRandomTurtle() {
  let breedRandomNumber = Math.floor(
    Math.random() * total_number_of_breeds + 1
  );
  let randomNumbers = new Array();
  for (let i = 0; i < total_components; i++) {
    let num = Math.floor(Math.random() * images_per_component + 1);
    randomNumbers.push(num.toString());
  }

  let blendedImage;

  for (let i = 0; i < total_components; i++) {
    let imageUrl =
      folder +
      "/breed_" +
      breedRandomNumber +
      "/" +
      components[i] +
      "/" +
      randomNumbers[i] +
      file_extension;
    if (i == 0) {
      blendedImage = await images(imageUrl);
    } else {
      blendedImage = await blendedImage.draw(images(imageUrl), 0, 0);
    }
  }

  return {
    componentIndicesArray: randomNumbers,
    imgdata: blendedImage.toBuffer("png"),
    breed: breedRandomNumber,
  };
}

export async function dummyTurtle() {
  let randomNumbers = new Array();
  for (let i = 0; i < total_components; i++) {
    let num = Math.floor(Math.random() * count_images_per_component[i] + 1);
    randomNumbers.push(num.toString());
  }
  const blendedImage = await images("./public/assets/character.png");
  return {
    componentIndicesArray: randomNumbers,
    imgdata: blendedImage.toBuffer("png"),
    breed: 1,
  };
}
