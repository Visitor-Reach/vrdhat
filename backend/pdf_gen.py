import os
from pyhtml2pdf import converter
import fitz
import PyPDF2
import re


def merge_pdf(church_name, pdf_routes):
    url_page_count = 1
    doc = fitz.open()  # an omitted argument causes creation of a new PDF

    # Now loop through names of input files to insert each.
    for filename in pdf_routes:
        doc.insert_file(r"reports/" + filename)  # appends it to the epdf
        if url_page_count == 1:
            doc.load_page(0)
        url_page_count += 1
    # At this point, we have a PDF that contains all input files.
    # We save it to disk, giving it a desired file name.
    doc.save(f"reports/{church_name}/{church_name}.pdf")
    doc.close()


def fix_links(church_name):
    # Open the PDF file for reading
    with open(f"reports/{church_name}.pdf", 'rb') as file:
        reader = PyPDF2.PdfReader(file)

        # Create a new PDF file for writing
        writer = PyPDF2.PdfWriter()

        # Iterate over all pages
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            # Add the modified page to the new PDF
            writer.add_page(page)

            print("Adding page")
        writer.remove_links()

    # Write the modified PDF to a new file
    with open(f"reports/{church_name}_links.pdf", 'wb') as output:
        writer.write(output)


def generate(church_name, id):
    dirs = [1, 2, 3, 4, 6, 7, 8, 9]
    church_name = church_name.lower().replace(" ", "_")
    church_name = re.sub(r'[^\w\s]', '', church_name)

    path = r"reports/" + church_name
    print("****", church_name)
    for dir in dirs:
        if not os.path.exists(path):
            os.makedirs(path)
        url = f'http://localhost:3000/complete_report/{str(dir)}?id={str(id)}'
        print(url)
        converter.convert(url, path + "/page" + str(dir) + ".pdf", print_options={"printBackground": True,
                                                                                  "paperHeight": 5.7,
                                                                                  "paperWidth": 10,
                                                                                  "marginBottom": 0,
                                                                                  "marginTop": 0,
                                                                                  "marginLeft": 0,
                                                                                  "marginRight": 0,
                                                                                  "scale": 0.5})
    # Create a list of image file paths
    pdf_pages = [
        f"{church_name}/page1.pdf",
        f"{church_name}/page2.pdf",
        f"{church_name}/page3.pdf",
        f"{church_name}/page4.pdf",
        f"{church_name}/page6.pdf",
        f"{church_name}/page7.pdf",
        f"{church_name}/page8.pdf",
        f"{church_name}/page9.pdf",
    ]
    merge_pdf(church_name, pdf_pages)


if __name__ == '__main__':
    generate('Dreamers Church', 'alexanderlopezp@gmail.com', '3')
