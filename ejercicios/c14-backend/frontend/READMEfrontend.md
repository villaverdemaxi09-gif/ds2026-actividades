## Clase 11 - 

### 1. Hooks/Ganchos
Un Hook es una función especial — siempre arranca con use — que te deja "engancharte" a funcionalidades de React desde un componente función.
Las dos reglas:
- Siempre en el nivel superior del componente — nunca dentro de un if, un loop, o una función anidada.
- Solo se llaman desde componentes o desde otros custom hooks.

### 2. useEffect
```tsx
useEffect(() => {
  const cargar = async () => { /* ... */ };
  cargar();
}); // <- sin array

Corregido:
tsx
useEffect(() => {
  const cargar = async () => { /* ... */ };
  cargar();
}, []); // <- se ejecuta una sola vez, al montar
```
La diferencia es literalmente una coma y dos corchetes — por eso es un buen ejercicio: el bug es fácil de introducir y fácil de pasar por alto al leer rápido.

### 3. Custom Hooks
Un custom hook no es nada nuevo de React — es una función tuya, con nombre useAlgo, que junta uno o más hooks en una sola pieza de lógica reutilizable. 
¿Por qué armarlos?
- Reutilización — la misma lógica en muchos componentes, sin copy-paste.
- Separación — el "cómo consigo el dato" queda separado del "cómo se ve la UI".