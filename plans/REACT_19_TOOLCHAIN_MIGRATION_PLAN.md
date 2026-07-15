# Plan: React 19 y alineación de toolchain

## Objetivo

Actualizar `@sito/dashboard` a React 19 y acercar su toolchain a la usada por
`@sito/ui`, empezando por las dependencias de menor riesgo. La integración de
componentes de `@sito/ui`, los estilos compartidos y los cambios de API pública
quedan fuera de este plan por ahora.

## Restricciones de trabajo

- No ejecutar scripts desde el agente.
- Hacer cambios pequeños y verificables por grupos.
- No sustituir dependencias propias de dashboard solo porque no existan en
  `@sito/ui`.
- No tocar los cambios existentes de `.nvmrc`, `package-lock.json` o
  `pnpm-lock.yaml` hasta que el desarrollador confirme que son la base de esta
  migración.
- Si una comprobación del desarrollador falla, detener el siguiente grupo y
  revisar el comando, el error y lo que se estaba verificando.

## Estado actual

Los manifiestos, el código compatible con React 19, CI y la documentación ya
están actualizados, incluido el checkpoint final de TypeScript 7 y Oxlint. No se
ejecutaron instalaciones ni scripts desde el agente, por lo que
`pnpm-lock.yaml` debe regenerarse y toda la suite debe ser ejecutada por el
desarrollador antes de considerar cerrada la migración.

## Comparación de referencia

| Área                     | `@sito/dashboard` | `@sito/ui` | Tratamiento                    |
| ------------------------ | ----------------- | ---------- | ------------------------------ |
| React                    | `18.3.1`          | `19.2.7`   | Actualizar primero             |
| React DOM                | `18.3.1`          | `19.2.7`   | Actualizar junto con React     |
| React types              | `18.3.x`          | `19.2.x`   | Actualizar junto con React     |
| Testing Library React    | `16.3.0`          | `16.3.2`   | Actualización sencilla         |
| Testing Library jest-dom | `6.6.3`           | `6.9.1`    | Actualización sencilla         |
| Vitest                   | `4.1.0`           | `4.1.10`   | Actualización sencilla         |
| Prettier                 | `3.8.1`           | `3.9.5`    | Actualización sencilla         |
| Storybook                | `10.2.x`          | `10.4.6`   | Actualizar como grupo          |
| jsdom                    | `26.1.0`          | `29.1.1`   | Major separado                 |
| Vite                     | `7.3.1`           | `8.1.4`    | Major separado                 |
| React plugin para Vite   | `4.7.0`           | `6.0.3`    | Actualizar con Vite            |
| DTS plugin               | `4.5.4`           | `5.0.3`    | Actualizar con Vite            |
| TypeScript               | `5.5.4`           | `7.0.2`    | Migrado en el checkpoint final |
| Lint                     | ESLint 10         | Oxlint     | Migrado junto con TypeScript 7 |

## Checkpoint 0: confirmar la base de paquetes

- [x] Confirmar si `.nvmrc`, la eliminación de `package-lock.json` y el nuevo
      `pnpm-lock.yaml` son cambios del desarrollador.
- [x] Si lo son, conservarlos y adoptar pnpm como única fuente de verdad.
- [x] Añadir `packageManager` y `engines` a `package.json` solo cuando sus valores
      estén confirmados con esa base.
- [x] No regenerar ni editar manualmente el lockfile antes de cerrar esta
      decisión.

Verificación del desarrollador:

```sh
node --version
pnpm --version
```

## Checkpoint 1: React 19

Paquetes:

- `react`: `19.2.7`
- `react-dom`: `19.2.7`
- `@types/react`: `19.2.17`
- `@types/react-dom`: `19.2.3`

Trabajo:

- [x] Revisar estáticamente usos de APIs eliminadas o modificadas por React 19.
- [x] Actualizar runtime, tipos y devDependencies como un único grupo.
- [x] Cambiar los peers de React y React DOM a `^19.0.0`.
- [x] Resolver únicamente incompatibilidades de React 19; no refactorizar
      componentes sin relación.
- [x] Revisar especialmente refs, JSX y tests que inspeccionen el DOM.

Verificación del desarrollador:

```sh
pnpm install
pnpm run build
pnpm run test
```

No avanzar si falla el build o algún test existente.

## Checkpoint 2: actualizaciones sencillas dentro de toolchains compatibles

Paquetes:

- `@testing-library/react`: `16.3.2`
- `@testing-library/jest-dom`: `6.9.1`
- `vitest`: `4.1.10`
- `prettier`: `3.9.5`

Trabajo:

- [x] Actualizar estos paquetes sin cambiar configuración.
- [x] No añadir `@testing-library/user-event` mientras el código no lo necesite.
- [x] Comprobar estáticamente que los imports actuales siguen siendo públicos.

Verificación del desarrollador:

```sh
pnpm install
pnpm run build
pnpm run test
pnpm run lint
```

## Checkpoint 3: Storybook 10.4

Actualizar conjuntamente a `10.4.6`:

- `storybook`
- `@storybook/react`
- `@storybook/react-vite`
- `@storybook/addon-docs`
- `@storybook/addon-a11y`

Trabajo:

- [x] Mantener todas las dependencias Storybook en la misma versión.
- [x] Revisar estáticamente `.storybook` y los tipos de las stories.
- [x] No modificar stories salvo incompatibilidad concreta de la actualización.

Verificación del desarrollador:

```sh
pnpm install
pnpm run build-storybook
```

## Checkpoint 4: jsdom 29

- [x] Actualizar `jsdom` de 26 a 29 de forma aislada.
- [x] Revisar `src/setupTests.ts` y los tests que dependan de eventos, portales o
      geometría del DOM.
- [x] No mezclar esta actualización con TypeScript.

Verificación del desarrollador:

```sh
pnpm install
pnpm run test
```

## Checkpoint 5: Vite 8 y plugins de build

Actualizar como una unidad:

- `vite`: `8.1.4`
- `@vitejs/plugin-react`: `6.0.3`
- `vite-plugin-dts`: `5.0.3`

Mantener:

- `vite-plugin-lib-inject-css`, salvo incompatibilidad demostrada.
- La estrategia de múltiples entrypoints de `@sito/dashboard`.
- React y React DOM como dependencias externas del bundle.

Trabajo:

- [x] Confirmar primero los requisitos de Node de Vite 8.
- [x] Revisar `vite.config.ts`, `tsconfig.node.json` y los nombres de salida.
- [x] Confirmar que cada subpath de `package.json#exports` sigue apuntando a un
      archivo generado.
- [x] No introducir todavía `@sito/ui` en el bundle.

Verificación del desarrollador:

```sh
pnpm install
pnpm run build
pnpm run test
pnpm run build-storybook
```

## Checkpoint 6: TypeScript 7 y Oxlint

- [x] Decidir la versión objetivo después de estabilizar Vite 8.
- [x] Añadir `@typescript/typescript6` como fallback de la API JavaScript que
      `vite-plugin-dts`/`unplugin-dts` necesita cuando el compilador principal es
      TypeScript 7.
- [x] Revisar `target`, `moduleResolution`, aliases y generación de declaraciones.
- [x] Actualizar TypeScript a `7.0.2`.
- [x] Sustituir ESLint por Oxlint type-aware usando `@sito/ui` como referencia.
- [x] Mantener Prettier y Knip como validaciones separadas.

Verificación del desarrollador:

```sh
pnpm run build
pnpm run test
pnpm run lint
```

## Dependencias que no se alinearán automáticamente

Se mantienen porque responden a necesidades propias de dashboard:

- Tailwind y `@tailwindcss/postcss`.
- PostCSS.
- `vite-plugin-lib-inject-css`.
- React Hook Form.
- FontAwesome.
- Knip.

ESLint y sus plugins se eliminaron en el checkpoint final. Oxlint es ahora el
linter type-aware y Prettier sigue siendo el propietario exclusivo del formato.

## Orden de ejecución

```txt
Base pnpm/Node
  -> React 19
  -> Testing Library + Vitest + Prettier
  -> Storybook 10.4
  -> jsdom 29
  -> Vite 8 + plugins
  -> TypeScript
```

Cada checkpoint debe quedar estable antes de abrir el siguiente. Después de
completar este plan se podrá empezar a estudiar la integración de `@sito/ui`
sin mezclarla con la migración del toolchain.
