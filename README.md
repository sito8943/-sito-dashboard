# @sito/dashboard

A React library for building customizable and responsive dashboards with ease.

## Features

- **Table Component**: A powerful table component with support for sorting, pagination, and customizable columns.
- **Translation Support**: Built-in translation support using a `TranslationProvider`.
- **Customizable**: Easily style and configure components to fit your needs.
- **Lightweight**: Optimized for performance and usability.

## Installation

To install the library, use npm or yarn:

```bash
# Using npm
npm install @sito/dashboard

# Using yarn
yarn add @sito/dashboard
```

## Table

Here’s how you can use the Table component in your project:

```bash
import React from "react";
import { Table } from "sito-dashboard";

const App = () => {
  const rows = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
  ];

  return (
    <Table
      title="User Table"
      data={rows}
      columns={columns}
    />
  );
};

export default App;
```

## Translation for its components

Wrap your application with the TranslationProvider to enable translations:

```bash
import React from "react";
import { TranslationProvider } from "@sito/dashboard";

const translations = {
  en: { hello: "Hello" },
  es: { hello: "Hola" },
};

const App = () => {
  const t = (key) => translations["en"][key]; // Example translation function

  return (
    <TranslationProvider t={t}>
      <h1>{t("hello")}</h1>
    </TranslationProvider>
  );
};

export default App;
```

## Components

### Table

The Table component is a flexible and feature-rich table for displaying data.

#### Props
| Propiedad             | Tipo         | Valor por defecto      | Descripción                                                         |
|-----------------------|--------------|-------------------------|---------------------------------------------------------------------|
| `title`              | `string`     | `""`                    | El título de la tabla.                                              |
| `data`               | `array`      | —                       | Los datos a mostrar en la tabla.                                   |
| `columns`            | `array`      | `[]`                    | Definiciones de columnas, incluyendo claves (`key`) y etiquetas.   |
| `isLoading`          | `boolean`    | `false`                 | Indica si la tabla está en estado de carga.                        |
| `actions`            | `Action[]`   | —                       | Función para renderizar acciones por fila.                         |
| `className`          | `string`     | `""`                    | Clase personalizada para el contenedor de la tabla.                |
| `contentClassName`   | `string`     | `""`                    | Clase personalizada para el contenido de la tabla.                 |
| `softDeleteProperty` | `string`     | `"deleted"`             | Propiedad usada para lógica de borrado suave.                      |
| `toolbar`            | `ReactNode`  | `<></>`                 | Componente personalizado para la barra de herramientas.            |
| `onSort`             | `function`   | —                       | Callback que se llama cuando se cambia el orden de la tabla.       |


### TranslationProvider

Provides translation support for your application.

#### Props
- `t` (function): A translation function that takes a key and returns the translated string.

### Examples

#### Columns definition

```
  key: string;
  label: string;
  sortable?: boolean;
  sortOptions: {
    icons: {
      className: string;
      asc: string;
      desc: string;
    };
  };
  className?: string;
  display?: "visible" | "none";
  pos?: number;
  renderBody?: (value: any, row: any) => ReactNode;
  renderHead?: () => void;
  filterOptions?: ColumnFilterOptions;
```

ColumnFilterOptions

```
{
  type: FilterTypes;
  defaultValue: any;
  label?: string;
}
```

FilterTypes enum

```
text,
number,
select,
autocomplete,
date,
check,
```

```
import { Table } from "@sito/dashboard";

const columns = [
  {
    key: "tagIds",
    label: t("_entities:news.tags.label"),
    filterOptions: {
      type: FilterTypes.autocomplete,
      options: tagsList,
      defaultValue: [],
    },
    sortable: false,
    renderBody: (_, news) =>
      (
        <div className="flex flex-wrap gap-3">
          {news.tags?.map(({ name, id }) => (
            <Chip key={id} label={name} spanClassName="text-xs" />
          ))}
        </div>
      ) ?? " - ",
  },
]

<Table data={...} columns={columns} />
```

#### Actions definition

```
{
  id: string;
  onClick: (entity: object) => void;
  icon: any;
  tooltip: string;
  hidden: (entity: object) => boolean;
}
```

```
import { Table } from "@sito/dashboard";

const addAction = {
  id: "add",
  hidden: false,
  onClick: async () => {
    // do some stuff here
  },
  icon: (
    <FontAwesomeIcon
      icon={isLoading ? faSpinner : faAdd}
      className={`text-success ${isLoading ? "rotate" : ""}`}
    />
  ),
  tooltip: t("_accessibility:buttons.add"),
}

<Table data={...} columns={...} actions={[addAction]} />
```

#### Your custom toolbar

```
import { Table } from "@sito/dashboard";

const Toolbar = () => {
  return <div>
    <h1>My custom toolbar</h1>
  </div>
}

<Table data={...} columns={...} toolbar={<Toolbar />} />
```

## Development

Running Locally

To run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/your-repo/sito-dashboard.git

cd sito-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server

```bash
npm start
```

Building the Library

To build the library for production

```bash
npm run build
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.