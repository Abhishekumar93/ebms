const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M216 216V115.5a8.3 8.3 0 0 0-2.6-5.9l-80-72.7a8 8 0 0 0-10.8 0l-80 72.7a7.9 7.9 0 0 0-2.6 5.9V216M16 216h224"
      className="dark:stroke-slate-300 stroke-slate-700"
    />
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M152 216v-56a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v56"
      className="dark:stroke-slate-300 stroke-slate-700"
    />
  </svg>
);
export default HomeIcon;
