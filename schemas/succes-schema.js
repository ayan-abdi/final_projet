class SuccessObjectRes {
  constructor(result, status = 200) {
    this.result = result;
    this.status = status;
  }
}

class SuccesArrayRes {
  constructor(results, count, status = 200) {
    this.results = results;
    this.count = count;
    this.status = status;
  }
}

module.exports = {
  SuccessObjectRes,
  SuccesArrayRes,
};
