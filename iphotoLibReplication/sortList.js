const fs = require('fs');

const list = [
  'IMG_4940.mov',
  'IMG_4955.MOV',
  'IMG_4996.mov',
  'IMG_4776.MOV',
  'IMG_4761.mov',
  'IMG_4787 (2).mov',
  'IMG_4805.mov',
  'IMG_4854.mov',
  'IMG_4932.mov',
  'IMG_4947.MOV',
  'IMG_4981.mov',
  'IMG_4768.MOV',
  'IMG_4753.mov',
  'IMG_4831.mov',
  'IMG_4846.mov',
  'IMG_4880.mov',
  'IMG_4924.mov',
  'IMG_4939.mov',
  'IMG_4973.MOV',
  'IMG_4887.mov',
  'IMG_4794.MOV',
  'IMG_4838.mov',
  'IMG_4745.mov',
  'IMG_4823.mov',
  'IMG_4901.MOV',
  'IMG_4950.MOV',
  'IMG_4879.mov',
  'IMG_4771.mov',
  'IMG_4800.mov',
  'IMG_4815.mov',
  'IMG_4864.MOV',
  'IMG_4942.mov',
  'IMG_4957.MOV',
  'IMG_4998.mov',
  'IMG_4778.mov',
  'IMG_4763.mov',
  'IMG_4807.MOV',
  'IMG_4841.mov',
  'IMG_4856.mov',
  'IMG_4934.mov',
  'IMG_4949.MOV',
  'IMG_4983.mov',
  'IMG_4897.MOV',
  'IMG_4848.mov',
  'IMG_4755.mov',
  'IMG_4740.mov',
  'IMG_4833.mov',
  'IMG_4926.mov',
  'IMG_4960.MOV',
  'IMG_4975.mov',
  'IMG_4796.mov',
  'IMG_4747.mov',
  'IMG_4810.mov',
  'IMG_4825.mov',
  'IMG_4903.MOV',
  'IMG_4918.MOV',
  'IMG_4788.MOV',
  'IMG_4959.MOV',
  'IMG_4739.mov',
  'IMG_4773.mov',
  'IMG_4802.mov',
  'IMG_4817.MOV',
  'IMG_4851.MOV',
  'IMG_4944.mov',
  'IMG_4858.mov',
  'IMG_4765.mov',
  'IMG_4750.mov',
  'IMG_4843.mov',
  'IMG_4921.mov',
  'IMG_4936.mov',
  'IMG_4985.mov',
  'IMG_4977.mov',
  'IMG_4884.mov',
  'IMG_4757.mov',
  'IMG_4791.MOV',
  'IMG_4742.mov',
  'IMG_4820.mov',
  'IMG_4835.mov',
  'IMG_4962.MOV',
  'IMG_4798.mov',
  'IMG_4749.mov',
  'IMG_4812.MOV',
  'IMG_4827.mov',
  'IMG_4861.MOV',
  'IMG_4905.MOV',
  'IMG_4787 (1).mov',
  'IMG_4995.mov',
  'IMG_4868.MOV',
  'IMG_4775.MOV',
  'IMG_4760.mov',
  'IMG_4804.MOV',
  'IMG_4819.mov',
  'IMG_4853.mov',
  'IMG_4931.mov',
  'IMG_4980.MOV',
  'IMG_4987.MOV',
  'IMG_4894.mov',
  'IMG_4767.MOV',
  'IMG_4752.mov',
  'IMG_4830.mov',
  'IMG_4845.mov',
  'IMG_4923.mov',
  'IMG_4938.mov',
  'IMG_4972.MOV',
  'IMG_4886.mov',
  'IMG_4759.mov',
  'IMG_4793.MOV',
  'IMG_4837.mov',
  'IMG_4744.mov',
  'IMG_4822.mov',
  'IMG_4871.MOV',
  'IMG_4964.MOV',
  'IMG_4878.MOV',
  'IMG_4814.MOV',
  'IMG_4829.mov',
  'IMG_4863.MOV',
  'IMG_4941.mov',
  'IMG_4956.MOV',
  'IMG_4997.mov',
  'IMG_4777.mov',
  'IMG_4762.mov',
  'IMG_4806.mov',
  'IMG_4840.mov',
  'IMG_4855.mov',
  'IMG_4933.mov',
  'IMG_4948.MOV',
  'IMG_4982.mov',
  'IMG_4896.MOV',
  'IMG_4754.mov',
  'IMG_4832.mov',
  'IMG_4847.mov',
  'IMG_4881.MOV',
  'IMG_4974.MOV',
  'IMG_4795.mov',
  'IMG_4839.mov',
  'IMG_4746.mov',
  'IMG_4824.mov',
  'IMG_4902.MOV',
  'IMG_4917.MOV',
  'IMG_4787.MOV',
  'IMG_4958.MOV',
  'IMG_4801.mov',
  'IMG_4816.mov',
  'IMG_4850.mov',
  'IMG_4999.mov',
  'IMG_4857.mov',
  'IMG_4891.mov',
  'IMG_4764.mov',
  'IMG_4808.MOV',
  'IMG_4842.mov',
  'IMG_4920.mov',
  'IMG_4935.mov',
  'IMG_4984.mov',
  'IMG_4976.mov',
  'IMG_4883.MOV',
  'IMG_4849.mov',
  'IMG_4756.mov',
  'IMG_4741.mov',
  'IMG_4790.MOV',
  'IMG_4834.mov',
  'IMG_4927.mov',
  'IMG_4961.MOV',
  'IMG_4797.mov',
  'IMG_4748.mov',
  'IMG_4811.MOV',
  'IMG_4826.mov',
  'IMG_4860.mov',
  'IMG_4919.MOV',
  'IMG_4789.MOV',
  'IMG_4994.MOV',
  'IMG_4774.mov',
  'IMG_4803.mov',
  'IMG_4818.mov',
  'IMG_4852.mov',
  'IMG_4930.mov',
  'IMG_4945.MOV',
  'IMG_4986.mov',
  'IMG_4859.mov',
  'IMG_4766.mov',
  'IMG_4751.mov',
  'IMG_4844.mov',
  'IMG_4893.mov',
  'IMG_4922.mov',
  'IMG_4971.MOV',
  'IMG_4978.MOV',
  'IMG_4885.mov',
  'IMG_4758.mov',
  'IMG_4743.mov',
  'IMG_4821.mov',
  'IMG_4836.mov',
  'IMG_4929.mov',
  'IMG_4963.MOV',
  'IMG_4799.MOV',
  'IMG_4877.mov',
  'IMG_4813.MOV',
  'IMG_4906.MOV',
  'IMG_5001.mov',
];

const sortedList = list.sort();
fs.writeFileSync('./output/sortedList.json', JSON.stringify(sortedList));
