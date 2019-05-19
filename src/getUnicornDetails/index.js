const productionFleet = {
  Bucephalus: {
    Name: 'Bucephalus',
    Color: 'Golden',
    Gender: 'Male'
  },
  Shadowfax: {
    Name: 'Shadowfax',
    Color: 'White',
    Gender: 'Male'
  },
  Rocinante: {
    Name: 'Rocinante',
    Color: 'Yellow',
    Gender: 'Female'
  }
};

const stagingFleet = {
  Norman: {
    Name: 'Norman',
    Color: 'Beige',
    Gender: 'Male'
  },
  Stewart: {
    Name: 'Stewart',
    Color: 'Taupe',
    Gender: 'Male'
  },
  Florence: {
    Name: 'Florence',
    Color: 'Parchment',
    Gender: 'Female'
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.handler = async message => {
  console.log(message);

  const fleet = (message.requestContext.stageVariables && message.requestContext.stageVariables.stage === 'production') ?
    productionFleet :
        stagingFleet;
  const delayedName = (message.requestContext.stageVariables && message.requestContext.stageVariables.stage === 'production') ?
    'Rocinante' : 'Norman';

  const unicornName = message.pathParameters.Name;
  const unicorn = fleet[unicornName];
  if (!unicorn) {
    return {
      statusCode: 404,
       body: 'Not Found'
    }
  }

  unicorn.Email = `${unicornName.toLowerCase()}@wildrydes.com`;

  console.log(`name: ${unicornName}, delayed: ${delayedName}`);
  if (unicornName === delayedName) {
    if (Math.random() >= 0.5) {
        await sleep(6000);
    } else {
        await sleep(4000);
    }
  }

  console.log(`Sending unicorn: ${JSON.stringify(unicorn, null, 2)}`);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(unicorn)
  };
}
