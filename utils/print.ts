function print(div: string) {
  var divContents = document.getElementById(div)?.innerHTML;
  var a: any = window.open("", "", "height=1000, width=1000");
  a.document.write(divContents);
  a.document.close(); // necessary for IE >= 10
  a.onload = function () {
    // necessary if the div contain images

    a.focus(); // necessary for IE >= 10
    a.print();
    a.close();
  };

  return true;
}

export default print;
