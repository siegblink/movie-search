import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import App from './components/App';

// src/api/key.js is not in the repo, so the tests bring a key of their own
jest.mock(
  './api/key',
  () => ({ __esModule: true, default: { secret: 'test-key' } }),
  { virtual: true }
);

const respondWith = body => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(body) })
  );
};

// Lets the mocked fetch resolve and React render the result
const settle = () => new Promise(resolve => setTimeout(resolve, 0));

let container;

beforeEach(() => {
  container = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
});

it('renders without crashing', async () => {
  respondWith({ Response: 'True', Search: [] });

  ReactDOM.render(<App />, container);
  await settle();
});

it('lists the movies OMDB returns', async () => {
  respondWith({
    Response: 'True',
    Search: [{ Title: 'Iron Man', Year: '2008', Poster: 'N/A' }],
  });

  ReactDOM.render(<App />, container);
  await settle();

  expect(container.textContent).toContain('Iron Man');
  expect(container.textContent).toContain('(2008)');
});

it('sends the configured API key', async () => {
  respondWith({ Response: 'True', Search: [] });

  ReactDOM.render(<App />, container);
  await settle();
  Simulate.change(container.querySelector('input[type="text"]'), {
    target: { value: 'batman' },
  });
  Simulate.click(container.querySelector('input[type="submit"]'));
  await settle();

  expect(global.fetch).toHaveBeenCalledTimes(2);
  global.fetch.mock.calls.forEach(([url]) => {
    expect(url).toContain('apikey=test-key');
  });
});

it('encodes the search term', async () => {
  respondWith({ Response: 'True', Search: [] });

  ReactDOM.render(<App />, container);
  await settle();
  Simulate.change(container.querySelector('input[type="text"]'), {
    target: { value: 'tom & jerry' },
  });
  Simulate.click(container.querySelector('input[type="submit"]'));
  await settle();

  const [url] = global.fetch.mock.calls[1];
  expect(url).toContain('s=tom%20%26%20jerry&');
});

it('shows the error OMDB sends back on the first load', async () => {
  respondWith({ Response: 'False', Error: 'Invalid API key!' });

  ReactDOM.render(<App />, container);
  await settle();

  expect(container.textContent).toContain('Invalid API key!');
});

it('shows a message when OMDB cannot be reached', async () => {
  global.fetch = jest.fn(() => Promise.reject(new TypeError('Failed to fetch')));

  ReactDOM.render(<App />, container);
  await settle();

  expect(container.textContent).toContain('Could not reach OMDB');
  expect(container.textContent).not.toContain('loading');
});

it('keeps the search button disabled until something is typed', async () => {
  respondWith({ Response: 'True', Search: [] });

  ReactDOM.render(<App />, container);
  await settle();
  const button = container.querySelector('input[type="submit"]');

  expect(button.disabled).toBe(true);

  Simulate.change(container.querySelector('input[type="text"]'), {
    target: { value: 'batman' },
  });

  expect(button.disabled).toBe(false);
  expect(button.style.backgroundColor).toBe('rgb(95, 39, 205)');
});
