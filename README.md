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

  const parseRows = (row) => ({
    id: row.id,
    name: row.name,
    age: row.age,
  });

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
- `title` (string): The title of the table.
- `subtitle` (string): The subtitle of the table.
- `data` (array): The data to display in the table.
- `columns` (array): Column definitions, including keys and labels, etc.
- `isLoading` (boolean): Whether the table is in a loading state.
- `actions` (function): A function to render actions for each row.
- `className` (string): Custom class for the table container.
- `contentClassName` (string): Custom class for the table content
- `softDeleteProperty` (string): Property for the softDelete logic
- `toolbar` (ReactNode): component for toolbar
- `onSort` (function): callback to call after sort change

### TranslationProvider

Provides translation support for your application.

#### Props
- `t` (function): A translation function that takes a key and returns the translated string.

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