//contrived example to explore aysnc-await

const users = [{
  id: 1,
  name: 'Dasa',
  school: 101
},
{
  id: 2,
  name: 'Hema',
  school: 999
},
{
  id: 3,
  name: 'Anish',
  school: 104
}];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 101,
    grade: 83
  },
  {
    id: 3,
    schoolId: 999,
    grade: 100
  },
  {
    id: 4,
    schoolId: 104,
    grade: 100
  }];

const getUser = (id) => {
  return new Promise((resolve, reject) => {

    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    }
    else{
      reject(`Unable to find user with id ${id}`);
    }
  });
}

const getGrades = (id, schoolId) => {
  return new Promise((resolve, reject) => {

    // const user = users.find((user) => user.id === id);
    const grade = grades.filter((grade) => grade.schoolId === schoolId);

    if (grade.length >0 ){
      resolve(grade);
    } else {
      reject(`Unable to find grades for ${id} in school ${schoolId}`);
    }
  });
}

// Dasa has an average of 83% in the class
const getStatus = (id) => {

  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if(!user) {
      reject(`Unable to find user with id ${id}`);
    }
    const grade = grades.filter((grade) => grade.schoolId === user.school);
    let average = 0;

    if (grade.length >0 ){
      average = grade.map((arrayItem) => arrayItem.grade).reduce((a, b) => a + b) / grade.length;
      valueReturned = `${user.name} has an average of ${average}`;
      resolve(valueReturned);
    } else {
      reject(`Unable to find grades for school ${user.school}, for user ${id}`);
    }

  });

};

const getStatusAlt = async (id) => {
  const user = await getUser(id);
  const grade = await getGrades(user.name, user.school);
  let average = 0;
  if (grade.length > 0) {
    average = grade.map((arrayItem) => arrayItem.grade).reduce((a, b) => a + b) / grade.length;
    return `${user.name} has an average of ${average}`;
  } else {
    return(`No grades found for ${user}, ${user.school}`)
  }


};

getStatusAlt(3).then((status)=> {
  console.log(status);
}).catch((e)=> {
  console.log(e);
});;
// console.log(getUser(2));
//
// getUser(2).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
//
// getGrades(101).then((grade) => {
//   console.log(grade);
// }).catch((e) => {
//   console.log(e);
// });

//
// getStatus(2).then((valueReturned) => {
//   console.log(valueReturned);
// }).catch((e) => {
//   console.log(e);
// });


//learn how reduce works
//
// const reducto = [0,1,2,3,4].reduce((acc, curr) => {
//   return acc + curr
// });
// console.log('reduce:', reducto); // 20
