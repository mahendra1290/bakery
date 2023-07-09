import { OptionGroup } from './components/OptionsModal';
import bakery from './assets/bakery-1.png';
import bakery2 from './assets/bakery-2.webp';
import bakery3 from './assets/bakery-3.webp';
import bakery4 from './assets/donut.webp';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isEggless?: boolean;
  options?: OptionGroup[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Croissant',
    price: 120,
    description: 'A buttery and flaky French pastry.',
    image: bakery3,
    isEggless: true,
    options: [
      {
        name: 'Variants',
        options: [
          { name: 'Plain', price: 0 },
          { name: 'Chocolate', price: 50 },
          { name: 'Almond', price: 75 },
        ],
        isMultiple: false,
        required: true,
      },
    ],
  },
  {
    id: 10,
    name: 'Chocolate Cake',
    price: 400,
    description: 'Decadent chocolate cake with rich frosting.',
    image: bakery2,
    options: [
      {
        name: 'Size',
        options: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 120 },
          { name: 'Large', price: 230 },
        ],
        isMultiple: false,
        required: true,
      },
      {
        name: 'Filling',
        options: [
          { name: 'None', price: 0 },
          { name: 'Vanilla Cream', price: 200 },
          { name: 'Raspberry Jam', price: 150 },
          { name: 'Salted Caramel', price: 250 },
        ],
        isMultiple: true,
        required: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Chocolate Chip Cookie',
    price: 15,
    description: 'Classic cookie with chocolate chips.',
    image: bakery4,
    isEggless: true,
  },
  {
    id: 3,
    name: 'Blueberry Muffin',
    price: 20,
    description: 'Moist muffin packed with juicy blueberries.',
    image: bakery,
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    price: 25,
    description: 'Sweet and gooey roll with cinnamon swirls.',
    image: bakery4,
  },
  {
    id: 5,
    name: 'Baguette',
    price: 30,
    description: 'Long and crusty French bread.',
    image: bakery2,
  },
  {
    id: 6,
    name: 'Apple Pie',
    price: 95,
    description: 'Delicious pie filled with fresh apples and spices.',
    image: bakery,
    options: [
      {
        name: 'Size',
        options: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 20 },
          { name: 'Large', price: 40 },
        ],
        isMultiple: false,
        required: true,
      },
    ],
  },
  {
    id: 7,
    name: 'Pain au Chocolat',
    price: 275,
    description: 'Buttery and flaky pastry filled with chocolate.',
    image: bakery3,
  },
  {
    id: 8,
    name: 'Strawberry Cupcake',
    price: 50,
    description: 'Fluffy cupcake topped with fresh strawberries.',
    image: bakery4,
    options: [
      {
        name: 'Icing',
        options: [
          { name: 'Vanilla', price: 0 },
          { name: 'Chocolate', price: 10 },
          { name: 'Strawberry', price: 0 },
        ],
        isMultiple: false,
        required: true,
      },
      {
        name: 'Sprinkles',
        options: [
          { name: 'None', price: 0 },
          { name: 'Rainbow', price: 50 },
          { name: 'Chocolate', price: 50 },
        ],
        isMultiple: true,
        required: false,
      },
    ],
  },
  {
    id: 9,
    name: 'Sourdough Bread',
    price: 40,
    description: 'Artisanal bread made with a sourdough starter.',
    image: bakery4,
  },
];

export default products;
