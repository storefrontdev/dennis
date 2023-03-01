import Image from "next/image";
import { RadioGroupItem } from "@radix-ui/react-radio-group";


const Value = ({ value }) => {


  return (
    <RadioGroupItem value={value} id={value.id} >
      {value.image && (
        <div className="mt-2 relative h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <Image
              src={value.image.file.url}
              alt={value.name}
              fill
              className="object-cover object-center rounded-full w-full h-full"
            />
        </div>
      )}

      {!value.image && (
        <div className="mt-2 text-xs uppercase px-4 py-2 relative rounded-full bg-gray-200 flex items-center justify-center">
          {value.name}
        </div>
      )}
    </RadioGroupItem>

)};

export default Value;