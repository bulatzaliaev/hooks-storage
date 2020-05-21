# API
### Hooks usage:
```js
import hooks from "hooks-storage";
```
### useAsync
```js
import { useAsync } from "hooks-storage"; 
const { execute, pending, value, error } = useAsync(asyncFunction, immediate);
```
### useOnClickOutside
```js
import { useOnClickOutside } from "hooks-storage"; 
// ref - reference to element
// handler - handler on outside click
useOnClickOutside(ref, handler);
```
### useMemoCompare
```js
import { useMemoCompare } from "hooks-storage"; 
// We want the previous obj if obj.id is the same as the new obj.id
// We pass a custom equality function as the second arg to our hook.
const theObj = useMemoCompare(value, compare);
```
### useLocalStorage
```js
import { useLocalStorage } from "hooks-storage";
// Similar to useState but first arg is key to the value in local storage.
const [storedValue, setValue] = useLocalStorage(key, value);
```
### useKeyPress
```js
import { useKeyPress } from "hooks-storage";
// Call hook for each key that we'd like to monitor
useKeyPress(targetKey);
```