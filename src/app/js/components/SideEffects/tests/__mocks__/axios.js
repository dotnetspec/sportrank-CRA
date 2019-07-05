//Following https://www.youtube.com/watch?v=Ngj2f1n9pUw
//this file should have the same name as the function being called 
export default {
    get: jest.fn().mockResolvedValue(
      //any relevant data can be passed here
      //as the component code will handle the actual
      //setState
      {data: []}
    )
}
