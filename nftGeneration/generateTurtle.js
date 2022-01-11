import images from 'images';

let folder = '../../public/assets/img/turtle_components';
let components = [
  'eyes',
  'hands',
  'head',
  'legs',
  'shell',
  'shell_outer',
  'tail',
];
let file_extension = '.png';
let total_components = components.length;

let count_images_per_component = [10, 10, 10, 10, 10];

export async function generateRandomTurtle() {
  let randomNumbers = new Array();

  for (let i = 0; i < total_components; i++) {
    let num = Math.floor(Math.random() * count_images_per_component[i] + 1);
    randomNumbers.push(num.toString());
  }

  let blendedImage;

  for (let i = 0; i < total_components; i++) {
    let imageUrl =
      folder + '/' + components[i] + '/' + randomNumbers[i] + file_extension;
    if (i == 0) {
      blendedImage = await images(imageUrl);
    } else {
      blendedImage = await blendedImage.draw(images(imageUrl), 0, 0);
    }
  }

  return {
    componentIndicesArray: randomNumbers,
    imgdata: blendedImage.toBuffer('png'),
  };
}

export async function dummyTurtle() {
  let randomNumbers = new Array();

  for (let i = 0; i < total_components; i++) {
    let num = Math.floor(Math.random() * count_images_per_component[i] + 1);
    randomNumbers.push(num.toString());
  }

  const blendedImage = await images('./public/assets/character.png');
  return {
    componentIndicesArray: randomNumbers,
    imgdata: blendedImage.toBuffer('png'),
  };
}
