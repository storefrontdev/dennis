import Image from "next/image";
import { RadioGroup, RadioGroupItem  } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import Value from "./value";

const Option = ({ option, setSelectedOptions }) => {

  const [activeOption, setActiveOption] = useState(option.values[0])

  useEffect(() => {
    setSelectedOptions((selectedOptions) => ({...selectedOptions, [option.name]: activeOption?.name}));
  }, [activeOption, option.name, setSelectedOptions])

  useEffect(() => {
    console.log(option)
  }, [option])

  return(
    <div>
      <div className="flex flex-col justify-center">
          <Label>
            {option?.name}:{" "}
            <span>
              {activeOption?.name || "Choose One"}
            </span>
          </Label>
          <RadioGroup defaultValue={activeOption} onValueChange={(value) => setActiveOption(value)}>
            <div className="flex items-center space-x-2 mt-2">
                {option.values.map((value, i) => (
                   <RadioGroupItem key={i} value={value} id={value.id} >
                    {value.image && (
                      <div className="relative h-16 w-16 rounded-full bg-white flex items-center justify-center">
                          <Image
                            src={value.image.file.url}
                            alt={value.name}
                            fill
                            className="object-cover object-center rounded-full w-full h-full"
                          />
                      </div>
                    )}
              
                    {!value.image && (
                      <div className="text-xs uppercase px-4 py-2 relative rounded-full bg-white flex items-center justify-center">
                        {value.name}
                      </div>
                    )}
                  </RadioGroupItem>
                ))}
            </div>
          </RadioGroup>
               
      
      </div>
    </div>
  )
}

export default Option;
