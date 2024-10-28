import Image from 'next/image';

type Option = {
  label: string;
  value: string;
};

type SelectionBoxProps = {
  label: string;
  options: Option[];
};

const SelectionBox: React.FC<SelectionBoxProps> = ({ label, options }) => (
  <label
    className="flex gap-5 justify-between p-2.5 mt-1 max-w-full text-xs text-gray-400 bg-white rounded-lg border border-gray-300 border-solid w-[463px]"
    aria-label={label}
  >
    <select className="my-auto">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Image
      src="/assets/icon-select.svg"
      alt="Select Option"
      className="shrink-0 w-5 aspect-square"
      width={20}
      height={20}
    />
  </label>
);

export default SelectionBox;
