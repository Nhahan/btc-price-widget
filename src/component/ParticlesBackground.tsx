import ParticlesBg from 'particles-bg';

export default function ParticlesBackground() {
  return (
    <div className='absolute top-0 left-0 w-full z-0 pointer-events-none h-[305vh]'>
      <ParticlesBg type='cobweb' color='#ffffff' num={600} />
    </div>
  );
}
