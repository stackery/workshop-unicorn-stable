const productionFleet = [
  {
    Name: 'Bucephalus',
    Color: 'Golden',
    Gender: 'Male'
  },
  {
    Name: 'Shadowfax',
    Color: 'White',
    Gender: 'Male'
  },
  {
    Name: 'Rocinante',
    Color: 'Yellow',
    Gender: 'Female'
  }
];

const stagingFleet = [
  {
    Name: 'Norman',
    Color: 'Beige',
    Gender: 'Male'
  },
  {
    Name: 'Stewart',
    Color: 'Taupe',
    Gender: 'Male'
  },
  {
    Name: 'Florence',
    Color: 'Parchment',
    Gender: 'Female'
  }
]

exports.handler = async message => {
  console.log(message);

  let unicorn;
  if (message.requestContext.stageVariables && message.requestContext.stageVariables.stage === 'production') {
    unicorn = productionFleet[Math.floor(Math.random() * fleet.length)];
  } else {
    unicorn = stagingFleet[Math.floor(Math.random() * fleet.length)];
  }

  console.log(`Sending unicorn: ${unicorn}`);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(unicorn)
  };
}
