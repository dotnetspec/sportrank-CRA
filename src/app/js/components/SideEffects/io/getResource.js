// function getResource(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.onload = () => resolve(xhr.responseText);
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//     //setTimeout(function() {
//     //resolve(url);
//   //}, 3000);
//   });
// }
// export default getResource();


// async function getResource() {
//   try {
//     setLoading(true);
//     const result = await getMethod(...params);
//     setValue(result);
//   } catch (e) {
//     setError(e);
//   } finally {
//     setLoading(false);
//   }
// }
// useEffect(() => {
//   getResource();
// }, params);
//
// return { value, error, loading };
// }
