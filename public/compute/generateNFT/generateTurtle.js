import images from "images";

var folder = "../../assets/img/turtle_components";
var components = [
  "eyes",
  "hands",
  "head",
  "legs",
  "shell",
  "shell_outer",
  "tail",
];
var file_extension = ".png";
var total_components = components.length;

var count_images_per_component = [10, 10, 10, 10, 10];

async function generateRandomTurtle() {
  var randomNumbers = new Array();

  for (var i = 0; i < total_components; i++) {
    var num = Math.floor(Math.random() * count_images_per_component[i] + 1);
    randomNumbers.push(num.toString());
  }

  var blendedImage;

  for (var i = 0; i < total_components; i++) {
    var imageUrl =
      folder + "/" + components[i] + "/" + randomNumbers[i] + file_extension;
    if (i == 0) {
      blendedImage = await images(imageUrl);
    } else {
      blendedImage = await blendedImage.draw(images(imageUrl), 0, 0);
    }
  }

  await blendedImage.save("newNFTImage/newTurtle.png");
  return randomNumbers;
}

module.exports = { generateRandomTurtle };
