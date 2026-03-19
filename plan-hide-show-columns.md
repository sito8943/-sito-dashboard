# Plan: Hide/Show Columns (UI dinámica)

## Contexto

Ya existe `display: "none" | "visible"` en `ColumnType` y `getSortedVisibleColumns()` filtra columnas ocultas. Lo que falta es un **control UI** para que el usuario toggle columnas en runtime.

## Archivos clave

- `src/components/Table/components/types.ts` — `ColumnType`
- `src/components/Table/components/TableHeader/TableHeader.tsx` — toolbar de la tabla
- `src/components/Table/components/Columns.tsx` — renderiza headers
- `src/components/Table/components/Rows.tsx` — renderiza celdas
- `src/components/Table/utils.ts` — `getSortedVisibleColumns`
- `src/providers/TableOptions/TableOptionsProvider.tsx` — estado global de tabla

## Steps

### 1. Agregar estado de columnas ocultas en `TableOptionsProvider`

- Nuevo state: `hiddenColumns: string[]` (array de `key`s)
- Exponer `hiddenColumns`, `toggleColumn(key)`, `setHiddenColumns(keys[])`
- Prop opcional `defaultHiddenColumns?: string[]`

### 2. Nuevo prop `hideable?: boolean` en `ColumnType`

- Solo columnas con `hideable: true` (o sin `hideable: false`) aparecen en el menú toggle
- Columnas esenciales (ej: checkbox de selección) no deben poder ocultarse

### 3. Crear componente `ColumnVisibilityMenu`

- Botón icon usando el SVG `TableColumns` en el `TableHeader` toolbar
- Al click, abre un dropdown/popover con la lista de columnas toggleables
- Cada columna muestra su `label` + un `CheckInput` (controlled by `checked`)
- Al toggle, llama `toggleColumn(key)`

### 4. Integrar visibilidad en `getSortedVisibleColumns`

- Modificar la función para que también reciba `hiddenColumns: string[]`
- Filtrar columnas cuyo `key` esté en `hiddenColumns` además de `display: "none"`

### 5. Pasar `hiddenColumns` a `Columns.tsx` y `Rows.tsx`

- Ambos ya usan `getSortedVisibleColumns` — solo agregar el param extra

### 6. Prop `canHideColumns?: boolean` en `Table`

- Controla si se muestra el `ColumnVisibilityMenu` en el header
- Default: `false`

### 7. Botón Reset en `TableHeader`

- Nuevo botón "Reset" con el SVG `BarsStaggered` en el toolbar del `TableHeader`
- Al click, restaura todo al estado por defecto:
  - `hiddenColumns` → `defaultHiddenColumns` (o `[]`)
  - `sortingBy` → valor inicial del provider
  - `sortingOrder` → valor inicial del provider
  - Filtros → valores por defecto de cada filtro
- Exponer `resetTableOptions()` desde `TableOptionsProvider`
- Solo se muestra si hay algún cambio respecto al estado por defecto

### 8. Tests

- Unit test de `getSortedVisibleColumns` con `hiddenColumns`
- Test de `ColumnVisibilityMenu` toggle behavior
- Test de `resetTableOptions` restaura filtros, sort y hiddenColumns
- Test de integración: columnas se ocultan/muestran en la tabla

### 9. Story en Storybook

- Nueva story `ColumnVisibility` mostrando el feature
- Incluir el botón Reset en la story

### 10. Actualizar `todo.md`

- Marcar "Can hide/show columns" como completado

## Flujo del usuario

```
Usuario ve tabla → Click botón "Columns" en toolbar →
Dropdown con checkboxes por columna → Toggle una columna →
La columna desaparece/aparece de la tabla
```

## Orden de implementación

1 → 2 → 4 → 5 → 3 → 6 → 7 → 8 → 9 → 10
