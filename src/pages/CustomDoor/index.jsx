// import styles from "./index.module.scss";

// import React, { useState,useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";

// const CustomDoor = () => {
  
//    const [widthOptions, setWidthOptions] = useState([]);
//   const [heightOptions, setHeightOptions] = useState([]);
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedHeight, setSelectedHeight] = useState(null);

//   // Fetch dimensions from backend using Axios
//   useEffect(() => {
//     axios.get("http://localhost:4000/product/dimensions")
//       .then((response) => {
//         setWidthOptions(response.data.widthOptions);
//         setHeightOptions(response.data.heightOptions);
//       })
//       .catch((error) => console.error("Error fetching dimensions:", error));
//   }, []);

//   return (
//     <div>
//         <div className={styles.dimensionRow}>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">width(Inch)</label>
//                 <Select
//                     options={widthOptions}
//                     value={selectedWidth}
//                     onChange={setSelectedWidth}
//                     placeholder="Enter width"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">Height(Inch)</label>
//                 <Select
//                     options={heightOptions}
//                     value={selectedHeight}
//                     onChange={setSelectedHeight}
//                     placeholder="Enter height"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//         </div>

//         <div className={styles.dimensionRow}>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">width(cm)</label>
//                 <Select
//                     options={widthOptions}
//                     value={selectedWidth}
//                     onChange={setSelectedWidth}
//                     placeholder="Enter width"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">Height(cm)</label>
//                 <Select
//                     options={heightOptions}
//                     value={selectedHeight}
//                     onChange={setSelectedHeight}
//                     placeholder="Enter height"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//         </div>

//         <div className={styles.dimensionRow}>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">width(mm)</label>
//                 <Select
//                     options={widthOptions}
//                     value={selectedWidth}
//                     onChange={setSelectedWidth}
//                     placeholder="Enter width"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//             <div className={styles.dimensionRowItem}>
//                 <label htmlFor="">Height(mm)</label>
//                 <Select
//                     options={heightOptions}
//                     value={selectedHeight}
//                     onChange={setSelectedHeight}
//                     placeholder="Enter height"
//                     isSearchable
//                     maxMenuHeight={150} // Sets the max height for the dropdown
//                 />
//             </div>
//         </div>
//     </div>
//   );
// };

// export default CustomDoor;

// import styles from "./index.module.scss";
// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import axios from "axios";

// // Conversion functions
// const toCM = (inches) => (inches * 2.54).toFixed(2);
// const toMM = (inches) => (inches * 25.4).toFixed(2);
// const toInchesFromCM = (cm) => (cm / 2.54).toFixed(2);
// const toInchesFromMM = (mm) => (mm / 25.4).toFixed(2);

// const CustomDoor = () => {
//   const [dimensionOptions, setDimensionOptions] = useState({ width: [], height: [] });
//   const [selectedWidth, setSelectedWidth] = useState(null);
//   const [selectedHeight, setSelectedHeight] = useState(null);

//   useEffect(() => {
//   axios.get("http://localhost:4000/product/dimensions")
//     .then((response) => {
//       const widthOptions = response.data.map((row) => ({
//         value: row.width_in,
//         label: row.width_in,
//       }));

//       const heightOptions = response.data.map((row) => ({
//         value: row.height_in,
//         label: row.height_in,
//       }));

//       setDimensionOptions({ width: widthOptions, height: heightOptions });
//     })
//     .catch((error) => console.error("Error fetching dimensions:", error));
// }, []);


//   const handleWidthChange = (selectedOption, unit) => {
//     let inches;
//     if (unit === "in") {
//       inches = selectedOption.value;
//     } else if (unit === "cm") {
//       inches = toInchesFromCM(selectedOption.value);
//     } else {
//       inches = toInchesFromMM(selectedOption.value);
//     }

//     setSelectedWidth({
//       in: { value: inches, label: inches },
//       cm: { value: toCM(inches), label: toCM(inches) },
//       mm: { value: toMM(inches), label: toMM(inches) },
//     });
//   };

//   const handleHeightChange = (selectedOption, unit) => {
//     let inches;
//     if (unit === "in") {
//       inches = selectedOption.value;
//     } else if (unit === "cm") {
//       inches = toInchesFromCM(selectedOption.value);
//     } else {
//       inches = toInchesFromMM(selectedOption.value);
//     }

//     setSelectedHeight({
//       in: { value: inches, label: inches },
//       cm: { value: toCM(inches), label: toCM(inches) },
//       mm: { value: toMM(inches), label: toMM(inches) },
//     });
//   };

//   return (
//     <div>
//       {/* Width Selection */}
//       <div className={styles.dimensionRow}>
//         <div className={styles.dimensionRowItem}>
//           <label>Width (Inch)</label>
//           <Select
//             options={dimensionOptions.width}
//             value={selectedWidth?.in}
//             onChange={(value) => handleWidthChange(value, "in")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//         <div className={styles.dimensionRowItem}>
//           <label>Width (cm)</label>
//           <Select
//             options={dimensionOptions.width}
//             value={selectedWidth?.cm}
//             onChange={(value) => handleWidthChange(value, "cm")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//         <div className={styles.dimensionRowItem}>
//           <label>Width (mm)</label>
//           <Select
//             options={dimensionOptions.width}
//             value={selectedWidth?.mm}
//             onChange={(value) => handleWidthChange(value, "mm")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//       </div>

//       {/* Height Selection */}
//       <div className={styles.dimensionRow}>
//         <div className={styles.dimensionRowItem}>
//           <label>Height (Inch)</label>
//           <Select
//             options={dimensionOptions.height}
//             value={selectedHeight?.in}
//             onChange={(value) => handleHeightChange(value, "in")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//         <div className={styles.dimensionRowItem}>
//           <label>Height (cm)</label>
//           <Select
//             options={dimensionOptions.height}
//             value={selectedHeight?.cm}
//             onChange={(value) => handleHeightChange(value, "cm")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//         <div className={styles.dimensionRowItem}>
//           <label>Height (mm)</label>
//           <Select
//             options={dimensionOptions.height}
//             value={selectedHeight?.mm}
//             onChange={(value) => handleHeightChange(value, "mm")}
//             isSearchable
//             maxMenuHeight={150}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomDoor;

import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import FlipDoor from "../../components/flipDoor";
import DoorPriceCalculator from "../../components/doorPriceCalculator";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";

const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;

  return (
    <div ref={innerRef} {...innerProps} className={styles.option}>
      <img src={data.image} alt={data.label} />
      <div className={styles.details}>
        <div className={styles.label}>{data.label}</div>
        <div className={styles.price}>₹{data.price}</div>
      </div>
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className={styles.singleValue}>
        <img src={data.image} alt={data.label} />
        <span className={styles.label}>{data.label}</span>
        <span className={styles.price}>(₹{data.price})</span>
      </div>
    </components.SingleValue>
  );
};


// Conversion functions
const toCM = (inches) => (inches * 2.54).toFixed(2);
const toMM = (inches) => (inches * 25.4).toFixed(2);
const toInchesFromCM = (cm) => (cm / 2.54).toFixed(2);
const toInchesFromMM = (mm) => (mm / 25.4).toFixed(2);

const CustomDoor = () => {

  const [widthOptions, setWidthOptions] = useState([]);
  const [heightOptions, setHeightOptions] = useState([]);
  const [selectedWidth, setSelectedWidth] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [wrapOptions, setWrapOptions] = useState([]);
  const [carvingOptions, setCarvingOptions] = useState([]);
  const [frontWrap, setFrontWrap] = useState(null);
  const [backWrap, setBackWrap] = useState(null);
  const [frontCarving, setFrontCarving] = useState(null);
  const [backCarving, setBackCarving] = useState(null);
  const [doorCount,setDoorCount]=useState(1);
  const { addItem } = useCart();
  const isAddDisabled = !selectedWidth || !selectedHeight ;
  const { user } = useUser();
  const location = useLocation();
  const baseWoodPrice=70;
  //console.log(location.state); 
  const product = location.state?.product;
  useEffect(() => {
    if (!product || wrapOptions.length === 0) return;
   console.log(product); 
    setSelectedHeight({
      in: { value: product.height_in, label: `${product.height_in} in` },
      cm: { value: toCM(product.height_in), label: `${toCM(product.height_in)} cm` },
      mm: { value: toMM(product.height_in), label: `${toMM(product.height_in)} mm` },
    });

    setSelectedWidth({
      in: { value: product.width_in, label: `${product.width_in} in` },
      cm: { value: toCM(product.width_in), label: `${toCM(product.width_in)} cm` },
      mm: { value: toMM(product.width_in), label: `${toMM(product.width_in)} mm` },
    });
   //console.log(wrapOptions)
    // Set wraps
    const front = wrapOptions.find(wrap => wrap.image === product.front_wrap || wrap.image === product.front_wrap_image );
    const back = wrapOptions.find(wrap => wrap.image === product.back_wrap || wrap.image === product.back_wrap_image);

    if (front) setFrontWrap(front);
    if (back) setBackWrap(back);
    setDoorCount(product?.quantity||1);
  
}, [product,wrapOptions]); 


 useEffect(() => {
  axios.get("http://localhost:4000/product/dimensions")
    .then((response) => {
      if (!response.data || !response.data.widthOptions || !response.data.heightOptions) {
        console.error("Unexpected API response format:", response.data);
        return;
      }

      // Convert width options
      const formattedWidthOptions = response.data.widthOptions.map((row) => {
        const inches = parseFloat(row.value);
        return {
          in: { value: inches, label: `${inches} in` },
          cm: { value: toCM(inches), label: `${toCM(inches)} cm` },
          mm: { value: toMM(inches), label: `${toMM(inches)} mm` }
        };
      });

      // Convert height options
      const formattedHeightOptions = response.data.heightOptions.map((row) => {
        const inches = parseFloat(row.value);
        return {
          in: { value: inches, label: `${inches} in` },
          cm: { value: toCM(inches), label: `${toCM(inches)} cm` },
          mm: { value: toMM(inches), label: `${toMM(inches)} mm` }
        };
      });

      setWidthOptions(formattedWidthOptions);
      setHeightOptions(formattedHeightOptions);

      
    })
    .catch((error) => console.error("Error fetching dimensions:", error));

    axios.get("http://localhost:4000/product/laminates")
    .then((response)=>{
      if (!response.data) {
        console.error("Unexpected API response format:", response.data);
        return;
      }

      const wraps = response.data.map(wrap => ({
        label: wrap.name,
        value: wrap.image,
        image: wrap.image,
        price: wrap.price
      }));
      setWrapOptions(wraps);
    })
    .catch((error) => console.error("Error fetching laminates:", error))

     axios.get("http://localhost:4000/product/carvings")
    .then((response)=>{
      if (!response.data) {
        console.error("Unexpected API response format:", response.data);
        return;
      }

      const carvs = response.data.map(carv => ({
        label: carv.name,
        value: carv.image,
        image: carv.image,
        price: carv.price
      }));
      setCarvingOptions(carvs);
    })
    .catch((error) => console.error("Error fetching laminates:", error))
}, []);

  const handleWidthChange = (selectedOption, unit) => {
    let inches;
    if (unit === "in") {
      inches = selectedOption.value;
    } else if (unit === "cm") {
      inches = toInchesFromCM(selectedOption.value);
    } else {
      inches = toInchesFromMM(selectedOption.value);
    }

    setSelectedWidth({
      in: { value: inches, label: `${inches} in` },
      cm: { value: toCM(inches), label: `${toCM(inches)} cm` },
      mm: { value: toMM(inches), label: `${toMM(inches)} mm` },
    });
  };

  const handleHeightChange = (selectedOption, unit) => {
    let inches;
    if (unit === "in") {
      inches = selectedOption.value;
    } else if (unit === "cm") {
      inches = toInchesFromCM(selectedOption.value);
    } else {
      inches = toInchesFromMM(selectedOption.value);
    }

    setSelectedHeight({
      in: { value: inches, label: `${inches} in` },
      cm: { value: toCM(inches), label: `${toCM(inches)} cm` },
      mm: { value: toMM(inches), label: `${toMM(inches)} mm` },
    });
  };

  const handleWrapChange =(value,face)=>{
    if(face==='front')
    {
      setFrontWrap(value)
      return;
    }
    setBackWrap(value)
  }

  const handleCarvChange =(value,face)=>{
    if(face==='front')
    {
      setFrontCarving(value)
      return;
    }
    setBackCarving(value)
  }

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
        <FlipDoor widthInInches={selectedWidth?.in?.value || 0}
                  heightInInches={selectedHeight?.in?.value || 0}
                  frontWrap={frontWrap?.value|| null}
                  backWrap={backWrap?.value || null}
                  frontCarving={frontCarving?.value || null}
                  backCarving={backCarving?.value || null}
                  >
        </FlipDoor>
      <div className={styles.attributeContainer}>
        <div className={styles.wrapContainer}>
          <h2>Select Wrap</h2> 
           <div className={styles.dimensionRow} > 
            
              <div className={styles.dimensionRowItem} style={{width:'50%'}}>
                <label>Front Wrap</label>
                <Select
                  options={wrapOptions}
                  value={frontWrap}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '250px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value)=>handleWrapChange(value,'front')}
                  isSearchable
                  maxMenuHeight={250}
                  components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                />
              </div>
              <div className={styles.dimensionRowItem} style={{width:'50%'}}>
                <label>Back wrap</label>
                <Select
                  options={wrapOptions}
                  value={backWrap}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '250px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value)=>handleWrapChange(value,'back')}
                  isSearchable
                  maxMenuHeight={250}
                  components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                />
              </div>
            </div>
        </div>  
        {/* Carvings */}
        <div className={styles.wrapContainer}>
          <h2>Select Carving</h2> 
           <div className={styles.dimensionRow} > 
            
              <div className={styles.dimensionRowItem} style={{width:'50%'}}>
                <label>Front Carving</label>
                <Select
                  options={carvingOptions}
                  value={frontCarving}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '250px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value)=>handleCarvChange(value,'front')}
                  isSearchable
                  maxMenuHeight={250}
                  components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                />
              </div>
              <div className={styles.dimensionRowItem} style={{width:'50%'}}>
                <label>Back Carving</label>
                <Select
                  options={carvingOptions}
                  value={backCarving}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '250px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value)=>handleCarvChange(value,'back')}
                  isSearchable
                  maxMenuHeight={250}
                  components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                />
              </div>
            </div>
        </div>  
          <div className={styles.dimensionsContainer}>
              <h2>Select Dimensions</h2>
            {/* Width Selection */}
            <div className={styles.dimensionRow}>
              <h3>Width:</h3>
              <div className={styles.dimensionRowItem}>
                {/* <label>Width (Inch)</label> */}
                <Select
                  options={widthOptions.length ? widthOptions.map(option => option.in) : []}
                  value={selectedWidth?.in || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleWidthChange(value, "in")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
              <div className={styles.dimensionRowItem}>
                {/* <label>Width (cm)</label> */}
                <Select
                  options={widthOptions.length ? widthOptions.map(option => option.cm) : []}
                  value={selectedWidth?.cm || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleWidthChange(value, "cm")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
              <div className={styles.dimensionRowItem}>
                {/* <label>Width (mm)</label> */}
                <Select
                  options={widthOptions.length ? widthOptions.map(option => option.mm) : []}
                  value={selectedWidth?.mm || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleWidthChange(value, "mm")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
            </div>

            {/* Height Selection */}
            <div className={styles.dimensionRow}>
              <h3>Height:</h3>
              <div className={styles.dimensionRowItem}>
                {/* <label>Height (Inch)</label> */}
                <Select
                  options={heightOptions.length ? heightOptions.map(option => option.in) : []}
                  value={selectedHeight?.in || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleHeightChange(value, "in")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
              <div className={styles.dimensionRowItem}>
                {/* <label>Height (cm)</label> */}
                <Select
                  options={heightOptions.length ? heightOptions.map(option=>option.cm): []}
                  value={selectedHeight?.cm || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleHeightChange(value, "cm")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
              <div className={styles.dimensionRowItem} >
                {/* <label>Height (mm)</label> */}
                <Select
                  options={heightOptions.length ? heightOptions.map(option=>option.mm): []}
                  value={selectedHeight?.mm || null}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minWidth: '150px' // ✅ This sets the min width
                    })
                  }}
                  onChange={(value) => handleHeightChange(value, "mm")}
                  isSearchable
                  maxMenuHeight={150}
                />
              </div>
            </div>
          </div>
          <DoorPriceCalculator 
            frontWrap={frontWrap} 
            backWrap={backWrap} 
            frontCarving={frontCarving} 
            backCarving={backCarving}
            baseWoodPrice={baseWoodPrice}
            doorWidthInches={selectedWidth?.in?.value || 0}
            doorHeightInches={selectedHeight?.in?.value || 0}
            doorCount={doorCount}
            setDoorCount={setDoorCount}
          /> 
          <div className={styles.buttonContainer} >
            
            <button className={styles.addToCartbutton} 
                style={{backgroundColor:"rgb(70, 98, 65)"}}
                disabled={isAddDisabled}
                 onClick={async () => {
                  const front_wrap_price = Number(frontWrap?.price) || 0;
                  const back_wrap_price = Number(backWrap?.price) || 0;
                  const front_carving_price = Number(frontCarving?.price) || 0;
                  const back_carving_price = Number(backCarving?.price) || 0;
                  const basePrice=Number(baseWoodPrice*(selectedWidth?.in.value*selectedHeight?.in.value)/144);
                  const item_price = front_wrap_price + back_wrap_price + front_carving_price + back_carving_price + basePrice;
                  
                  if (isAddDisabled) return;
                  if (!user?.identifier) {
                    alert("Please log in to add to cart.");
                    return;
                  }

                  const newItem = {
                    id: typeof product?.id === "number" ? product.id : null,
                    item_name: product?.name || "Custom Door",
                    width_in: selectedWidth?.in?.value,
                    height_in: selectedHeight?.in?.value,
                    front_wrap: frontWrap?.label || 'None',
                    front_wrap_image:frontWrap?.value,
                    back_wrap: backWrap?.label || 'None',
                    back_wrap_image: backWrap?.value,
                    front_wrap_price: frontWrap?.price || 0,
                    back_wrap_price: backWrap?.price || 0,
                    front_carving: frontCarving?.label || 'None',
                    back_carving: backCarving?.label || 'None',
                    front_carving_price: frontCarving?.price || 0,
                    back_carving_price: backCarving?.price || 0,
                    item_amount: item_price || 0,
                    quantity: doorCount || 1,
                    identifier: user.identifier, // phone or email
                  };

                  try {
                    const res = await axios.post(
                      "http://localhost:4000/user/cart/add",
                      newItem,
                      { withCredentials: true }
                    );

                    if (res.data.success) {
                      alert("Added to cart!");
                      const localItem = {
                        ...newItem,
                        name: newItem.item_name, 
                      };
                      addItem(localItem);
                    } else {
                      alert("Failed to add: " + res.data.message);
                    }
                  } catch (error) {
                    console.error("Add to cart failed:", error);
                    alert("Error adding to cart. Try again.");
                  }

                }}

            >Add to Cart</button>
          </div>      
      </div>  
    </div>
  );
};

export default CustomDoor;
