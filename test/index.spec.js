import expect from 'expect';
import Refraction from 'refraction';
import play from '../src/';


describe('Refraction-player', () => {
  let refraction = new Refraction();
  global.performance = {};
  const temporizedTrack = [{
    channel: 'firstChannel',
    time: 100,
    param: {},
  }, {
    channel: 'excludeChannel',
    time: 300,
    param: {},
  }, {
    channel: 'secondChannel',
    time: 700,
    param: {},
  }, {
    channel: 'thirdChannel',
    time: 1700,
    param: {},
  }];
  const getTemporizedSubscriber = (firstTime, secondTime, done) => {
    let previous = 0;
    return {
      firstChannel: () => {
        previous = Date.now();
      },
      excludeChannel: () => {
        throw new Error('Channel not excluded');
      },
      secondChannel: () => {
        const now = Date.now();
        expect(now - previous).toBeGreaterThanOrEqualTo(firstTime);
        previous = now;
      },
      thirdChannel: () => {
        const now = Date.now();
        expect(now - previous).toBeGreaterThanOrEqualTo(secondTime);
        done();
      },
    };
  };

  afterEach(() => {
    refraction = new Refraction();
  });

  it('should exclude channel', (done) => {
    refraction.subscribe({
      excludeChannel: () => {
        throw new Error('Channel not excluded');
      },
      completeChannel: () => {
        done();
      },
    });
    const track = [{
      channel: 'excludeChannel',
      param: {},
    }, {
      channel: 'completeChannel',
      param: {},
    }];
    play({
      refraction,
      track,
      exclude: ['excludeChannel'],
    });
  });

  it('should play with delay', function delay(done) {
    this.timeout(6000);
    refraction.subscribe(getTemporizedSubscriber(2000, 1000, done));
    play({
      refraction,
      track: temporizedTrack,
      delay: 1000,
      ignoreTime: true,
      exclude: ['excludeChannel'],
    });
  });

  it('should play with time', function time(done) {
    this.timeout(5000);
    refraction.subscribe(getTemporizedSubscriber(600, 1000, done));
    play({
      refraction,
      track: temporizedTrack,
      exclude: ['excludeChannel'],
    });
  });


  it('should play with default values', () => {
    play({
      refraction,
    });
  });
});
