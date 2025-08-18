#!/bin/bash

# WebP Conversion Script for KONSTANDER Images
# Quality: 80 (good balance between quality and file size)

echo "🎯 Starting comprehensive image optimization..."

# Function to convert image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="$2"
    local quality="${3:-80}"
    
    echo "Converting: $input_file"
    
    # Check if input file exists
    if [[ ! -f "$input_file" ]]; then
        echo "❌ File not found: $input_file"
        return 1
    fi
    
    # Check file type and handle accordingly
    file_type=$(file "$input_file" | grep -i "HEIF\|heic")
    if [[ -n "$file_type" ]]; then
        echo "📱 HEIF detected, converting via JPEG first..."
        temp_file="${input_file%.*}_temp.jpg"
        sips -s format jpeg "$input_file" --out "$temp_file"
        cwebp -q "$quality" "$temp_file" -o "$output_file"
        rm "$temp_file"
    else
        cwebp -q "$quality" "$input_file" -o "$output_file"
    fi
    
    if [[ $? -eq 0 ]]; then
        # Get file sizes
        original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
        new_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
        
        # Calculate compression ratio
        reduction=$(echo "scale=1; (($original_size - $new_size) * 100) / $original_size" | bc -l)
        
        echo "✅ Success! Size reduction: ${reduction}% ($(numfmt --to=iec $original_size) → $(numfmt --to=iec $new_size))"
        return 0
    else
        echo "❌ Failed to convert: $input_file"
        return 1
    fi
}

# Convert all remaining images

# Page images
convert_to_webp "public/images/aboutuspage.jpeg" "public/images/aboutuspage.webp"
convert_to_webp "public/images/aboutusvideocover.jpeg" "public/images/aboutusvideocover.webp"
convert_to_webp "public/images/aceptamospage.jpg" "public/images/aceptamospage.webp"
convert_to_webp "public/images/contactpage.jpg" "public/images/contactpage.webp"
convert_to_webp "public/images/pricepage.jpg" "public/images/pricepage.webp"
convert_to_webp "public/images/ventapage.jpg" "public/images/ventapage.webp"

# Logo
convert_to_webp "public/images/logo_konstander_black.png" "public/images/logo_konstander_black.webp"

# Material category images
convert_to_webp "public/images/MaterialesqueAceptamos/bronce.jpg" "public/images/MaterialesqueAceptamos/bronce.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/electrico.jpg" "public/images/MaterialesqueAceptamos/electrico.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/fierro.jpg" "public/images/MaterialesqueAceptamos/fierro.webp"

# Ferrosos materials
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-fundido.jpg" "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-fundido.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-largo.jpg" "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-largo.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-lata.jpg" "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-lata.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-mixto.jpg" "public/images/MaterialesqueAceptamos/MaterialesFerrosos/fierro-mixto.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesFerrosos/viruta.jpg" "public/images/MaterialesqueAceptamos/MaterialesFerrosos/viruta.webp"

# Non-ferrosos materials
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/618f1fb4a7672a7b919e90b80a1b3381.jpg" "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/brass-scrap.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/copper-recycling-process.jpg" "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/copper-recycling-process.webp"
convert_to_webp "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/cx4dat4nvxr7mchqpc1p3o7sseey4erq.jpg" "public/images/MaterialesqueAceptamos/MaterialesNoFerrosos/copper-wires.webp"

echo ""
echo "🎉 Image optimization complete!"
echo "📊 Check the results and update your code references accordingly."
