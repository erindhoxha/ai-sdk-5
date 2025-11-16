import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-2.0-flash');

const stream = streamText({
  model,
  prompt: 'Give me a sonnet about a cat called Steven.',
});

for await (const chunk of stream.toUIMessageStream()) {
  console.log(chunk);
}

// Response looks like this:

/* 
{ type: 'start' }
{ type: 'start-step' }
{ type: 'text-start', id: '0' }
{ type: 'text-delta', id: '0', delta: 'Upon' }
{
  type: 'text-delta',
  id: '0',
  delta: ' the hearth, where sunbeams softly fall,\nLies Steven, king in'
}
{
  type: 'text-delta',
  id: '0',
  delta: " feline majesty.\nHe stretches forth, ignoring duty's call,\nA furry"
}
{
  type: 'text-delta',
  id: '0',
  delta: ', purring, regal entity.\n' +
    'His emerald eyes, with wisdom softly gleam,\n' +
    'Observe the world with languid, judging gaze.\n' +
    'He dreams'
}
{
  type: 'text-delta',
  id: '0',
  delta: " of birds, a hunter's silent scheme,\n" +
    'Then wakes to lick his paws in hazy daze.\n' +
    'He tolerates a gentle scratch behind\n' +
    'His velvet'
}
{
  type: 'text-delta',
  id: '0',
  delta: ' ears, a rumble starts to grow.\n' +
    'A lordly presence, of a noble kind,\n' +
    'He lets affection tentatively show.\n' +
    'So let him sleep, this Steven, grand and sleek,\n' +
    'A purring comfort, secrets in his cheek.\n'
}
{ type: 'text-end', id: '0' }
{ type: 'finish-step' }
{ type: 'finish' }
*/
