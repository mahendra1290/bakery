import { OptionGroup } from './components/OptionsModal';
import bakery from './assets/bakery-1.png';
import bakery2 from './assets/bakery-2.webp';
import bakery3 from './assets/bakery-3.webp';

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
    price: 2.5,
    description: 'A buttery and flaky French pastry.',
    image: bakery3,
    options: [
      {
        name: 'Variants',
        options: [
          { name: 'Plain', price: 0 },
          { name: 'Chocolate', price: 0.5 },
          { name: 'Almond', price: 0.75 },
        ],
        isMultiple: false,
        required: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Chocolate Chip Cookie',
    price: 1.5,
    description: 'Classic cookie with chocolate chips.',
    image: bakery,
  },
  {
    id: 3,
    name: 'Blueberry Muffin',
    price: 2.0,
    description: 'Moist muffin packed with juicy blueberries.',
    image: bakery,
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    price: 2.5,
    description: 'Sweet and gooey roll with cinnamon swirls.',
    image: bakery2,
  },
  {
    id: 5,
    name: 'Baguette',
    price: 3.0,
    description: 'Long and crusty French bread.',
    image: bakery2,
  },
  {
    id: 6,
    name: 'Apple Pie',
    price: 4.5,
    description: 'Delicious pie filled with fresh apples and spices.',
    image: bakery,
    options: [
      {
        name: 'Size',
        options: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 1 },
          { name: 'Large', price: 2 },
        ],
        isMultiple: false,
        required: true,
      },
    ],
  },
  {
    id: 7,
    name: 'Pain au Chocolat',
    price: 2.75,
    description: 'Buttery and flaky pastry filled with chocolate.',
    image: bakery2,
  },
  {
    id: 8,
    name: 'Strawberry Cupcake',
    price: 2.0,
    description: 'Fluffy cupcake topped with fresh strawberries.',
    image: bakery3,
    options: [
      {
        name: 'Icing',
        options: [
          { name: 'Vanilla', price: 0 },
          { name: 'Chocolate', price: 0 },
          { name: 'Strawberry', price: 0 },
        ],
        isMultiple: false,
        required: true,
      },
      {
        name: 'Sprinkles',
        options: [
          { name: 'None', price: 0 },
          { name: 'Rainbow', price: 0.5 },
          { name: 'Chocolate', price: 0.5 },
        ],
        isMultiple: true,
        required: false,
      },
    ],
  },
  {
    id: 9,
    name: 'Sourdough Bread',
    price: 4.0,
    description: 'Artisanal bread made with a sourdough starter.',
    image: bakery2,
  },
  {
    id: 10,
    name: 'Chocolate Cake',
    price: 5.5,
    description: 'Decadent chocolate cake with rich frosting.',
    image: bakery3,
    options: [
      {
        name: 'Size',
        options: [
          { name: 'Small', price: 0 },
          { name: 'Medium', price: 5 },
          { name: 'Large', price: 10 },
        ],
        isMultiple: false,
        required: true,
      },
      {
        name: 'Filling',
        options: [
          { name: 'None', price: 0 },
          { name: 'Vanilla Cream', price: 2 },
          { name: 'Raspberry Jam', price: 1.5 },
          { name: 'Salted Caramel', price: 2.5 },
        ],
        isMultiple: true,
        required: false,
      },
    ],
  },
];

export default products;
