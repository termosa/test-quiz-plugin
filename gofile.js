const go = require('go')
const quiz = require('go-plugin-quiz')
go.use(quiz)

const log = console.log

const ask = async (questions, options) => {
  log('\n')
  log('questions:', questions)
  const answer = await go.ask(questions, options)
  log('answer:', JSON.stringify(answer))
}

go.registerCommand('ping', async () => {
  await go.confirm('Are you ready?')
  await ask('hello')
  await ask({ message: 'hello' })
  await ask([{ message: 'hello' }], { prefix: '', suffix: '?' })
  await ask({ type: 'confirm', message: 'hello' })
  await ask({ type: 'list', message: 'hello', choices: [ 'a', 'b', 'c', go.ask.separator(), 'd', 'e', 'f', go.ask.separator(), 'g', { name: 'h', disabled: true }, { name: 'i', disabled: 'whi?' }, go.ask.separator() ] })
  await ask({ type: 'rawlist', message: 'hello', choices: [ 'a', 'b', 'c', go.ask.separator(), 'd', 'e', 'f', go.ask.separator(), 'g', { name: 'h', disabled: true }, { name: 'i', disabled: 'whi?' }, go.ask.separator() ] })
  await ask([
    { type: 'confirm', message: 'show next step?', name: 'show' },
    { name: 'nothing', message: 'I am here for you!', when: answers => answers.show }
  ])
  await ask({
    type: 'checkbox',
    message: 'Select toppings',
    name: 'toppings',
    pageSize: 8,
    choices: [
      go.ask.separator(' = The Meats = '),
      'Something simple?',
      { name: 'Pepperoni', checked: true },
      { name: 'Ham' },
      { name: 'Ground Meat' },
      { name: 'Bacon' },
      go.ask.separator(' = The Cheeses = '),
      { name: 'Mozzarella' },
      { name: 'Cheddar' },
      { name: 'Parmesan' },
      go.ask.separator(' = The usual ='),
      { name: 'Mushroom' },
      { name: 'Tomato' },
      go.ask.separator(' = The extras = '),
      { name: 'Pineapple' },
      { name: 'Olives', disabled: 'out of stock' },
      { name: 'Extra cheese' }
    ],
    validate: (answer) => answer.length < 1 ? 'You must choose at least one topping.' : true
  })
  await ask({
    type: 'expand',
    message: 'Conflict on `file.js`: ',
    name: 'overwrite',
    choices: [
      { key: 'y', name: 'Overwrite', value: 'overwrite' },
      { key: 'a', name: 'Overwrite this one and all next', value: 'overwrite_all' },
      { key: 'd', name: 'Show diff', value: 'diff' },
      go.ask.separator(),
      { key: 'x', name: 'Abort', value: 'abort' }
    ]
  })
  await ask({ type: 'password', message: 'secret', mask: '*' })
  await ask({
    type: 'autocomplete',
    name: 'from',
    message: 'Select a state to travel from',
    source: ['Go', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Ruby', '.Net', 'Python'].sort()
  })
  await ask({ type: 'editor', message: 'hooray!', default: '\nahah\nit is incredible!\nisn\'t it?' })
})
