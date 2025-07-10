# Vehicle Parts Finder

A responsive form that helps customers find vehicle parts by selecting Year, Make, Model, and Product Type. Dynamically generates Partify USA collection URLs based on user selections.

## Features
- Cascading dropdowns with dynamic filtering
- Mobile-responsive design
- Results display with direct link to products
- Sample dataset included (RAM and Toyota models)
- Modern UI with smooth animations

## How It Works
1. User selects vehicle Year
2. Make dropdown populates based on Year
3. Model dropdown populates based on Year + Make
4. Product Type dropdown populates based on vehicle selection
5. Form generates URL: `https://partifyusa.com/collections/{year}-{make}-{model}?filter.p.product_type={product}`

## Usage
Simply open `index.html` in any modern browser. The form uses a sample dataset that can be expanded by modifying the `vehicleData` array in the JavaScript section.

## Data Structure
The solution uses this data format:
```js
{
  year: "2015",
  make: "RAM",
  model: "1500",
  productType: "Front Bumper"
}
