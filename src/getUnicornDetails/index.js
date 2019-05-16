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

  const fleet = (message.requestContext.stageVariables && message.requestContext.stageVariables.stage === 'production') ?
    productionFleet :
    stagingFleet;

  const unicorn = fleet[Math.floor(Math.random() * fleet.length)];

  console.log(`Sending unicorn: ${JSON.stringify(unicorn, null, 2)}`);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(unicorn)
  };
}

export detailsHandler = async event => {
    console.log(event);
    return {
        statusCode: 200,
        body: json.stringify(event)
    }
}
