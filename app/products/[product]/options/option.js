
import { RadioGroup } from "@/components/ui/radio-group";
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
            <div className="flex items-center space-x-2">
              {option.values.map((value, i) => (
                <Value key={i} value={value} />
              ))}
            </div>
          </RadioGroup>
               
      
      </div>
    </div>
  )
}

export default Option;
