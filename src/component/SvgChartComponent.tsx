type Props = {
  theme: string;
  svg: string;
};

export default function SvgChartComponent({ theme, svg }: Props) {
  const base64Svg = `data:image/svg+xml;base64,${btoa(svg)}`;

  return (
    <div className='mb-8 opacity-0 animate-fade-in'>
      <h2 className='text-xl font-semibold'>{theme}</h2>
      <div className='mt-2 w-[700px] h-[350px] overflow-hidden relative'>
        <img
          src={base64Svg}
          alt={`${theme} chart`}
          className='w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100'
        />
      </div>
    </div>
  );
}
