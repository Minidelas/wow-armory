export interface Character {
  name: string;
  realm: {
    name: string;
    slug: string;
  };
  level: number;
  faction: {
    type: string;
    name: string;
  };
  race: {
    name: string;
  };
  character_class: {
    name: string;
  };
  // Añadir más propiedades según necesites
} 