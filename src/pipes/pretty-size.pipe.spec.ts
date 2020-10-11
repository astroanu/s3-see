import { PrettySizePipe } from "./pretty-size.pipe";

describe("PrettySizePipe", () => {
  let pipe: PrettySizePipe;

  beforeEach(() => {
    pipe = new PrettySizePipe();
  });

  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return formatted size", () => {
    expect(pipe.transform(20)).toEqual("20 B");
    expect(pipe.transform(20500)).toEqual("20.5 kB");
    expect(pipe.transform(21000500)).toEqual("21.0 MB");
    expect(pipe.transform(20000000000)).toEqual("20.0 GB");
    expect(pipe.transform(25060000000078)).toEqual("25.1 TB");
    expect(pipe.transform(45300000000000453)).toEqual("45.3 PB");
    expect(pipe.transform(45000000000000645064)).toEqual("45.0 EB");
    expect(pipe.transform(345345000000000000034534)).toEqual("345.3 ZB");
    expect(pipe.transform(3345300000000000000453453453)).toEqual("3345.3 YB");
  });
});
