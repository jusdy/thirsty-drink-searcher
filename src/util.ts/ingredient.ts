import { IIngredient } from '@/interfaces/drink.interface';

const measureValues = {
  tsp: 1,
  oz: 16,
  cup: 48,
  tblsp: 3,
  spoons: 1,
  cl: 2,
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const getIngredientValue = (strMeasure: string | null) => {
  if (!strMeasure) return 0;

  const measureParts = strMeasure.replace(' fresh', '').trim().split(' ');
  const measure = measureParts[measureParts.length - 1];

  if (measureParts[measureParts.length - 2] === 'of') {
    return 48 * eval(measure);
  }

  if (!measureValues.hasOwnProperty(measure)) return 0;

  let parsedValue = 0;

  measureParts.slice(0, -1).forEach((value) => {
    parsedValue += eval(value);
  });

  return parsedValue * measureValues[measure as keyof typeof measureValues];
};

export const getIngredients = (drinkData: any) => {
  const ingredientArray: IIngredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drinkData[`strIngredient${i}`];
    const measure = drinkData[`strMeasure${i}`];

    if (ingredient) {
      const data: IIngredient = {
        color: getRandomColor(),
        strIngredient: ingredient,
        strMeasure: measure,
      };

      ingredientArray.push(data);
    }
  }

  return ingredientArray;
};

export const getChatData = (ingredientData: IIngredient[]) => {
  const chatData = ingredientData.map((ingredient) => ({
    title: ingredient.strIngredient,
    value: getIngredientValue(ingredient.strMeasure),
    color: ingredient.color,
  }));

  return chatData;
};
