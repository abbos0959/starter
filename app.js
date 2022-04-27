const express = require('express');
const app = express();
const fs = require('fs');
const tour = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  'utf-8'
);
const re = fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`);
const tours = JSON.parse(tour);
const rew = JSON.parse(re);

app.use(express.json());
app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'success',
    tours: tours,
  });
});

app.get('/api/v1/rewievs', (req, res) => {
  res.status(200).send({
    status: 'success',
    rewievs: rew,
  });
});

//------------------------post methodi------------------------------

app.post('/api/v1/tours', (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const completdObj = Object.assign({ id: newId }, data);
  tours.push(completdObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: completdObj,
        },
      });
    }
  );
});

app.get(`/api/v1/tours/:id`, (req, res) => {
  const Id = +req.params.id;

  const data = tours.find((val) => val.id === Id);
  if (data) {
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  } else {
    res.status(404).json({
      status: 'failed',
      data: {
        data: 'bunday malumot yoq',
      },
    });
  }
});

app.delete(`/api/v1/tours/:id`, (req, res) => {
  const Id = +req.params.id;

  const arr = tours.filter((val) => val.id !== Id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(arr),
    (err) => {
      res.status(204).json({
        status: 'delete',
      });
    }
  );
});

const Port = 8000;
app.listen(Port, '127.0.0.1');
