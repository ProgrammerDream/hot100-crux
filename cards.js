/*
 * 卡库 v3（构建产物）：按题分组，每张卡=完整题解代码里挖掉一个临界点 + 题面。
 * 临界点/答案/解释来自 scripts/cards-flat.js（对抗式校验过），完整代码/题面来自 hot100 官方题解。
 * 勿手改；重建：node scripts/assemble-v3.js。共 99 题 / 363 张卡。
 */
window.CRUX_VERSION = "3";
window.CRUX_PROBLEMS = [
 {
  "id": 1,
  "title": "1. 两数之和",
  "category": "哈希",
  "difficulty": "easy",
  "descHtml": "<p>给定一个整数数组 <code>nums</code>&nbsp;和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值 </strong><em><code>target</code></em>&nbsp; 的那&nbsp;<strong>两个</strong>&nbsp;整数，并返回它们的数组下标。</p>\n\n<p>你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。</p>\n\n<p>你可以按任意顺序返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,7,11,15], target = 9\n<strong>输出：</strong>[0,1]\n<strong>解释：</strong>因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,4], target = 6\n<strong>输出：</strong>[1,2]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,3], target = 6\n<strong>输出：</strong>[0,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>只会存在一个有效答案</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以想出一个时间复杂度小于 <code>O(n<sup>2</sup>)</code> 的算法吗？</p>",
  "code": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> hashtable;\n        for (int i = 0; i < nums.size(); ++i) {\n            auto it = hashtable.find(target - nums[i]); // 先查：我需要的另一半是否已出现\n            if (it != hashtable.end()) {\n                return {it->second, i};\n            }\n            hashtable[nums[i]] = i; // 后存：保证不会用到自己\n        }\n        return {};\n    }\n};",
  "cards": [
   {
    "id": "p1-twosum-complement-sign",
    "crux": "查找补数时用 target - nums[i]，而不是写反或写成加法",
    "answer": "target - nums[i]",
    "blankOffset": 209,
    "blankLen": 16,
    "options": [
     "target - nums[i]",
     "nums[i] - target",
     "nums[i] + target"
    ],
    "why": "需要的补数 x 必须满足 nums[i] + x = target，解出来就是 x = target - nums[i]；这一步查的是「还差多少能凑够 target」，减法顺序不能颠倒。",
    "wrongWhy": {
     "nums[i] - target": "把减法顺序写反，查的是正确补数 target - nums[i] 的相反数；只有当 nums[i] - target 恰好等于表中某个已存入的键时才可能偶然命中，一般情况下会查到错误的值或根本查不到，导致漏解或答案错误。",
     "nums[i] + target": "变成求两数之和而不是求补数，逻辑完全偏离题意，几乎不可能查到能配对的下标。"
    }
   },
   {
    "id": "p1-twosum-check-before-insert",
    "crux": "先查表、命中后返回，再把当前数存入表——存入这一步必须紧跟在判断之后、且不能提前",
    "answer": "hashtable[nums[i]] = i; // 后存：保证不会用到自己",
    "blankOffset": 354,
    "blankLen": 38,
    "options": [
     "hashtable[nums[i]] = i; // 后存：保证不会用到自己",
     "hashtable[i] = nums[i];",
     "hashtable[target - nums[i]] = i;"
    ],
    "why": "必须是「先查后存」：查询用的是当前 nums[i]，如果在查询之前就把自己存进表，当 target 恰好等于 2*nums[i] 时就会把自己当成另一半，返回 {i, i} 这种自己配自己的错误答案；存入时 key 必须是 nums[i]（值），value 是 i（下标），这样后续用 find(target - nums[i]) 才能按「值」查到「下标」。",
    "wrongWhy": {
     "hashtable[i] = nums[i];": "把 key 和 value 存反了，表里变成「下标 → 值」，而 find 是按数值去查的，键值不对应会导致几乎所有查找都失败，正确答案对也查不到。",
     "hashtable[target - nums[i]] = i;": "存入的 key 用了错误的表达式（存的是补数而不是当前数本身），后续别的元素想通过自身值找它时对不上，破坏了「值→下标」这个映射关系，导致查找失败。"
    }
   }
  ]
 },
 {
  "id": 2,
  "title": "2. 两数相加",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给你两个&nbsp;<strong>非空</strong> 的链表，表示两个非负的整数。它们每位数字都是按照&nbsp;<strong>逆序</strong>&nbsp;的方式存储的，并且每个节点只能存储&nbsp;<strong>一位</strong>&nbsp;数字。</p>\n\n<p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p>\n\n<p>你可以假设除了数字 0 之外，这两个数都不会以 0&nbsp;开头。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [2,4,3], l2 = [5,6,4]\n<strong>输出：</strong>[7,0,8]\n<strong>解释：</strong>342 + 465 = 807.\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [0], l2 = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>输出：</strong>[8,9,9,9,0,0,0,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>每个链表中的节点数在范围 <code>[1, 100]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n\t<li>题目数据保证列表表示的数字不含前导零</li>\n</ul>",
  "code": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode *head = nullptr, *tail = nullptr;\n        int carry = 0;\n        while (l1 || l2) {\n            int n1 = l1 ? l1->val: 0; // 短链走完后按 0 补位\n            int n2 = l2 ? l2->val: 0;\n            int sum = n1 + n2 + carry;\n            if (!head) {\n                head = tail = new ListNode(sum % 10);\n            } else {\n                tail->next = new ListNode(sum % 10);\n                tail = tail->next;\n            }\n            carry = sum / 10;\n            if (l1) {\n                l1 = l1->next;\n            }\n            if (l2) {\n                l2 = l2->next;\n            }\n        }\n        if (carry > 0) {\n            tail->next = new ListNode(carry);\n        }\n        return head;\n    }\n};",
  "cards": [
   {
    "id": "p2-loop-condition-or-not-and",
    "crux": "循环条件必须用 || 而不是 &&，否则短链先走完时会提前退出循环",
    "answer": "||",
    "blankOffset": 175,
    "blankLen": 2,
    "options": [
     "||",
     "&&"
    ],
    "why": "两条链表长度可能不同，只要还有一条没走完（l1 或 l2 非空）就必须继续循环，取值时用三元表达式对走完的链补 0；这要求循环条件用 || 而不是 &&。",
    "wrongWhy": {
     "&&": "只要其中一条链先遍历完变成 nullptr，&& 条件立刻为假，循环就会提前终止，导致另一条更长的链剩余的高位数字被完全丢弃，结果链表位数偏少。"
    }
   },
   {
    "id": "p2-value-use-mod-ten",
    "crux": "新节点存的是当前位数字，必须用 sum % 10 取余数，不能用 sum / 10",
    "answer": "%",
    "blankOffset": 386,
    "blankLen": 1,
    "options": [
     "%",
     "/"
    ],
    "why": "sum 是本位两数加进位的结果，个位数字才是当前节点该存的值，所以要用 sum % 10 取余；sum / 10 得到的是进位商，含义完全不同。",
    "wrongWhy": {
     "/": "用 sum / 10 会把进位值当成当前位的数字存进节点，导致每一位结果都算错，例如 5+5=10 时本该存 0，却存成了 1。"
    }
   },
   {
    "id": "p2-carry-use-div-ten",
    "crux": "进位必须用 sum / 10（整除）计算，不能用 sum % 10",
    "answer": "/",
    "blankOffset": 540,
    "blankLen": 1,
    "options": [
     "/",
     "%"
    ],
    "why": "carry 表示除个位外向高位进的量，只能通过 sum 整除 10 得到；sum % 10 取的是个位数字，跟进位的含义正好相反。",
    "wrongWhy": {
     "%": "用 sum % 10 会让 carry 变成本位的个位数字而不是进位量，导致后续每一位加法都拿到错误的进位输入，结果从某一位开始整体算错。"
    }
   },
   {
    "id": "p2-final-carry-gt-zero",
    "crux": "循环结束后要判断 carry > 0 才补一个进位节点，等号和方向都不能错",
    "answer": ">",
    "blankOffset": 708,
    "blankLen": 1,
    "options": [
     ">",
     ">=",
     "<"
    ],
    "why": "循环结束后 carry 只可能是 0 或 1，只有 carry > 0 时才需要在末尾额外补一个进位节点，如 5+5=10 的最高位；这是官方题解特别强调的易错点。",
    "wrongWhy": {
     ">=": "carry 要么是 0 要么是正数，>= 0 恒为真，即使没有进位也会多插入一个值为 0 的多余节点，导致结果链表多出一位。",
     "<": "carry 不可能为负数，< 0 这个条件永远不成立，导致最高位真正产生的进位（如 5+5=10）被漏掉，结果整体少一位。"
    }
   },
   {
    "id": "p2-advance-pointer-guard-if",
    "crux": "推进 l1 前必须先用 if (l1) 判空，不能直接解引用或改用 while",
    "answer": "if (l1)",
    "blankOffset": 558,
    "blankLen": 7,
    "options": [
     "if (l1)",
     "if (l1->next)",
     "while (l1)"
    ],
    "why": "两条链要按位同步前进，每轮只需在 l1 非空时把它推进一步，用 if (l1) 既能避免对 nullptr 解引用，又能保证和 l2 保持同步。",
    "wrongWhy": {
     "if (l1->next)": "如果 l1 本身已经是 nullptr，访问 l1->next 会先发生空指针解引用而崩溃，而且判断对象也搞错了（应判断 l1 是否存在，而不是它的下一个节点）。",
     "while (l1)": "会把 l1 一口气走到链表末尾，跳过了和 l2 逐位同步遍历的节奏，破坏按位相加的整体逻辑，使后续位的加法完全错乱。"
    }
   }
  ]
 },
 {
  "id": 3,
  "title": "3. 无重复字符的最长子串",
  "category": "滑动窗口",
  "difficulty": "medium",
  "descHtml": "<p>给定一个字符串 <code>s</code> ，请你找出其中不含有重复字符的&nbsp;<strong>最长 <span data-keyword=\"substring-nonempty\">子串</span></strong><strong>&nbsp;</strong>的长度。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"abcabcbb\"\n<strong>输出: </strong>3 \n<strong>解释:</strong> 因为无重复字符的最长子串是 <code>\"abc\"</code>，所以其长度为 3。注意 \"bca\" 和 \"cab\" 也是正确答案。\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"bbbbb\"\n<strong>输出: </strong>1\n<strong>解释: </strong>因为无重复字符的最长子串是 <code>\"b\"</code>，所以其长度为 1。\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"pwwkew\"\n<strong>输出: </strong>3\n<strong>解释: </strong>因为无重复字符的最长子串是&nbsp;<code>\"wke\"</code>，所以其长度为 3。\n&nbsp;    请注意，你的答案必须是 <strong>子串 </strong>的长度，<code>\"pwke\"</code>&nbsp;是一个<em>子序列，</em>不是子串。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>s</code>&nbsp;由英文字母、数字、符号和空格组成</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // 哈希集合，记录每个字符是否出现过\n        unordered_set<char> occ;\n        int n = s.size();\n        // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动\n        int rk = -1, ans = 0;\n        // 枚举左指针的位置，初始值隐性地表示为 -1\n        for (int i = 0; i < n; ++i) {\n            if (i != 0) {\n                // 左指针向右移动一格，移除一个字符\n                occ.erase(s[i - 1]);\n            }\n            while (rk + 1 < n && !occ.count(s[rk + 1])) {\n                // 不断地移动右指针\n                occ.insert(s[rk + 1]);\n                ++rk;\n            }\n            // 第 i 到 rk 个字符是一个极长的无重复字符子串\n            ans = max(ans, rk - i + 1);\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p3-rk-initial-minus-one",
    "crux": "右指针 rk 的初始值必须是 -1（表示空窗口，尚未开始移动），不能写成 0 或 1",
    "answer": "-1",
    "blankOffset": 222,
    "blankLen": 2,
    "options": [
     "-1",
     "0",
     "1"
    ],
    "why": "rk=-1 表示右指针还停在字符串左边界的左侧、窗口为空；后续用 while (rk+1<n && ...) 从下标 0 开始尝试扩张，语义上是\"下一个要试探的字符是 rk+1\"。这样第一轮循环 i=0 时 rk+1=0，恰好从 s[0] 开始检查，逻辑自洽。",
    "wrongWhy": {
     "0": "若 rk 初始为 0，则 rk+1=1，第一次 while 检查会跳过 s[0]，导致 s[0] 从未被真正插入验证，窗口起点计算和 ans=rk-i+1 的结果都会偏小或语义错乱",
     "1": "rk 初始为 1 会让右指针误认为已经处理过 s[0]、s[1]，直接跳过对前两个字符的判重，窗口长度统计从一开始就多算，答案偏大"
    }
   },
   {
    "id": "p3-while-boundary-rk-plus-1",
    "crux": "内层 while 的扩张条件必须是 rk + 1 < n（先加 1 再比较），不能写成 rk < n 或 rk + 1 <= n",
    "answer": "rk + 1 < n",
    "blankOffset": 438,
    "blankLen": 10,
    "options": [
     "rk + 1 < n",
     "rk < n",
     "rk + 1 <= n"
    ],
    "why": "下一个待探测字符是 s[rk+1]，必须保证这个下标合法，即 rk+1 严格小于 n（数组长度），这样条件判断和后面的 s[rk+1] 访问才不会越界。",
    "wrongWhy": {
     "rk < n": "当 rk = n-1 时该条件仍为真（n-1<n），会继续访问 s[rk+1] = s[n]，导致数组越界（未定义行为/多算一个字符）",
     "rk + 1 <= n": "允许 rk+1 等于 n 时也进入循环体，此时访问 s[rk+1] 即 s[n] 越界，是典型的 <= 多判一次的边界错误"
    }
   },
   {
    "id": "p3-answer-length-formula",
    "crux": "更新答案的窗口长度公式是 rk - i + 1，不能写成 rk - i 或 rk - i + 2",
    "answer": "rk - i + 1",
    "blankOffset": 648,
    "blankLen": 10,
    "options": [
     "rk - i + 1",
     "rk - i",
     "rk - i + 2"
    ],
    "why": "窗口 [i, rk] 是闭区间，包含左右端点，长度 = 右端点下标 - 左端点下标 + 1，这是闭区间长度的通用公式。",
    "wrongWhy": {
     "rk - i": "少加 1，会把窗口长度少算一位，导致最终答案系统性偏小 1",
     "rk - i + 2": "多加 1，相当于把窗口右边界之外多算了一个字符，导致答案系统性偏大 1"
    }
   },
   {
    "id": "p3-erase-index-i-minus-1",
    "crux": "左指针右移时要移除的是 s[i - 1]（上一轮的左端点），不是 s[i] 或 s[i + 1]",
    "answer": "s[i - 1]",
    "blankOffset": 394,
    "blankLen": 8,
    "options": [
     "s[i - 1]",
     "s[i]",
     "s[i + 1]"
    ],
    "why": "左指针从 i-1 移动到 i，意味着 s[i-1] 不再属于新窗口，必须把它从集合里移除；i 本身及之后的字符仍在窗口内不能删。",
    "wrongWhy": {
     "s[i]": "误删了当前左端点本身，导致 s[i] 在集合中被清空，之后 while 内 occ.count 判重会漏判，产生错误地把已存在的重复字符当作不存在",
     "s[i + 1]": "删错了窗口内部尚未越界的字符，会导致集合内容与实际窗口不一致，进而使判重逻辑失效、可能算出偏大的错误答案"
    }
   }
  ]
 },
 {
  "id": 4,
  "title": "4. 寻找两个正序数组的中位数",
  "category": "二分查找",
  "difficulty": "hard",
  "descHtml": "<p>给定两个大小分别为 <code>m</code> 和 <code>n</code> 的正序（从小到大）数组&nbsp;<code>nums1</code> 和&nbsp;<code>nums2</code>。请你找出并返回这两个正序数组的 <strong>中位数</strong> 。</p>\n\n<p>算法的时间复杂度应该为 <code>O(log (m+n))</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums1 = [1,3], nums2 = [2]\n<strong>输出：</strong>2.00000\n<strong>解释：</strong>合并数组 = [1,2,3] ，中位数 2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums1 = [1,2], nums2 = [3,4]\n<strong>输出：</strong>2.50000\n<strong>解释：</strong>合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>nums1.length == m</code></li>\n\t<li><code>nums2.length == n</code></li>\n\t<li><code>0 &lt;= m &lt;= 1000</code></li>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>1 &lt;= m + n &lt;= 2000</code></li>\n\t<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int getKthElement(const vector<int>& nums1, const vector<int>& nums2, int k) {\n        /* 主要思路：要找到第 k (k>1) 小的元素，那么就取 pivot1 = nums1[k/2-1] 和 pivot2 = nums2[k/2-1] 进行比较\n         * 这里的 \"/\" 表示整除\n         * nums1 中小于等于 pivot1 的元素有 nums1[0 .. k/2-2] 共计 k/2-1 个\n         * nums2 中小于等于 pivot2 的元素有 nums2[0 .. k/2-2] 共计 k/2-1 个\n         * 取 pivot = min(pivot1, pivot2)，两个数组中小于等于 pivot 的元素共计不会超过 (k/2-1) + (k/2-1) <= k-2 个\n         * 这样 pivot 本身最大也只能是第 k-1 小的元素\n         * 如果 pivot = pivot1，那么 nums1[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \"删除\"，剩下的作为新的 nums1 数组\n         * 如果 pivot = pivot2，那么 nums2[0 .. k/2-1] 都不可能是第 k 小的元素。把这些元素全部 \"删除\"，剩下的作为新的 nums2 数组\n         * 由于我们 \"删除\" 了一些元素（这些元素都比第 k 小的元素要小），因此需要修改 k 的值，减去删除的数的个数\n         */\n\n        int m = nums1.size();\n        int n = nums2.size();\n        int index1 = 0, index2 = 0;\n\n        while (true) {\n            // 边界情况\n            if (index1 == m) {\n                return nums2[index2 + k - 1];\n            }\n            if (index2 == n) {\n                return nums1[index1 + k - 1];\n            }\n            if (k == 1) {\n                return min(nums1[index1], nums2[index2]);\n            }\n\n            // 正常情况\n            int newIndex1 = min(index1 + k / 2 - 1, m - 1);\n            int newIndex2 = min(index2 + k / 2 - 1, n - 1);\n            int pivot1 = nums1[newIndex1];\n            int pivot2 = nums2[newIndex2];\n            if (pivot1 <= pivot2) {\n                k -= newIndex1 - index1 + 1;\n                index1 = newIndex1 + 1;\n            }\n            else {\n                k -= newIndex2 - index2 + 1;\n                index2 = newIndex2 + 1;\n            }\n        }\n    }\n\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int totalLength = nums1.size() + nums2.size();\n        if (totalLength % 2 == 1) {\n            return getKthElement(nums1, nums2, (totalLength + 1) / 2);\n        }\n        else {\n            return (getKthElement(nums1, nums2, totalLength / 2) + getKthElement(nums1, nums2, totalLength / 2 + 1)) / 2.0;\n        }\n    }\n};",
  "cards": [
   {
    "id": "p4-kth-newindex-upper-bound",
    "crux": "新下标裁剪上界必须是 m - 1（数组合法下标上限），不能写成 m",
    "answer": "m - 1",
    "blankOffset": 1244,
    "blankLen": 5,
    "options": [
     "m - 1",
     "m",
     "index1 + m - 1",
     "m - 1 - index1"
    ],
    "why": "nums1 的合法下标范围是 0..m-1，当 index1 + k/2 - 1 超出数组末尾时，必须把 newIndex1 裁剪到 m - 1 才能保证后面 nums1[newIndex1] 不越界读取。",
    "wrongWhy": {
     "m": "裁剪上界写成 m 时 newIndex1 可能等于 m，紧接着 nums1[newIndex1] 就是越界访问，行为未定义。",
     "index1 + m - 1": "多加了 index1 这个偏移，当 index1 > 0 时上界会比真实数组末尾更靠后，仍可能越界或让裁剪失效。",
     "m - 1 - index1": "把上界当成\"剩余长度\"来算，量纲搞反，得到的值远小于真实的 m - 1，会让排除逻辑提前判断错误的边界。"
    }
   },
   {
    "id": "p4-kth-exclude-count-plus-one",
    "crux": "排除元素个数是闭区间 [index1, newIndex1] 共 newIndex1 - index1 + 1 个，必须 +1",
    "answer": "newIndex1 - index1 + 1",
    "blankOffset": 1455,
    "blankLen": 22,
    "options": [
     "newIndex1 - index1 + 1",
     "newIndex1 - index1",
     "newIndex1 - index1 + 2",
     "k / 2"
    ],
    "why": "从 index1 到 newIndex1（闭区间）一共有 newIndex1 - index1 + 1 个元素被判定不可能是第 k 小并整体排除，k 必须精确减去这么多，才能让 k 继续表示\"在剩余数组中找第 k 小\"。",
    "wrongWhy": {
     "newIndex1 - index1": "少算 1 个元素，k 比应减少的值大 1，后续会多保留一个本该排除的元素，累积误差导致最终结果偏移。",
     "newIndex1 - index1 + 2": "多算 1 个元素，k 减得过多，会把本该保留、尚未确认排除的元素也当作已排除，可能提前得到错误结果甚至越界。",
     "k / 2": "只有当 newIndex1 未被 min 裁剪（即未触达数组末尾）时才恰好等于 k/2；一旦 newIndex1 被裁剪为 m-1，二者不再相等，直接用 k/2 会让排除个数与实际不符。"
    }
   },
   {
    "id": "p4-kth-empty-array-return-index",
    "crux": "某数组耗尽后，从剩余数组里取第 k 小要用 0 下标的 index1 + (k - 1)",
    "answer": "k - 1",
    "blankOffset": 1051,
    "blankLen": 5,
    "options": [
     "k - 1",
     "k",
     "k - 2"
    ],
    "why": "nums2 已经排空，第 k 小的元素一定在 nums1 从 index1 开始往后数第 k 个，由于数组下标从 0 开始，第 k 个对应的下标是 index1 + (k - 1)。",
    "wrongWhy": {
     "k": "下标多加了 1，取到的是从 index1 数起的第 k+1 个元素，结果偏大一位，且当 index1+k 恰好越界时还会读到数组外。",
     "k - 2": "下标少了 1，取到的是第 k-1 个元素，返回值偏小一位，不是真正的第 k 小。"
    }
   },
   {
    "id": "p4-median-odd-length-formula",
    "crux": "总长度为奇数时中位数是第 (totalLength + 1) / 2 小的元素，整数除法要先 +1 再除",
    "answer": "(totalLength + 1) / 2",
    "blankOffset": 1882,
    "blankLen": 21,
    "options": [
     "(totalLength + 1) / 2",
     "totalLength / 2",
     "(totalLength - 1) / 2"
    ],
    "why": "总长度为奇数 2m+1 时，排序后中位数是第 m+1 个元素，即第 (totalLength + 1) / 2 小；先加 1 再整除保证向上取整到正确的中间位置（例如长度 5 时取第 3 小）。",
    "wrongWhy": {
     "totalLength / 2": "整数除法向下取整，比正确位置少 1，例如长度为 5 时得到 2 而不是 3，取到的是中位数前一个元素。",
     "(totalLength - 1) / 2": "同样向下偏移，例如长度为 5 时得到 2，仍然取错了下标，结果比真实中位数偏小。"
    }
   },
   {
    "id": "p4-median-even-length-divide-float",
    "crux": "偶数长度取两数之和后必须除以浮点数 2.0，否则整数除法会截断小数",
    "answer": "2.0",
    "blankOffset": 2050,
    "blankLen": 3,
    "options": [
     "2.0",
     "2"
    ],
    "why": "getKthElement 返回 int，两个整数相加后若除以整数 2 会发生整数除法，直接截断小数部分；除以 2.0 会让编译器先把结果提升为浮点数再做除法，从而正确保留 .5 这样的中位数小数部分。",
    "wrongWhy": {
     "2": "整数除法会丢弃小数部分，例如两个第 k 小元素之和为 5，正确中位数应为 2.5，但整数除法会截断成 2，结果错误。"
    }
   }
  ]
 },
 {
  "id": 5,
  "title": "5. 最长回文子串",
  "category": "多维动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个字符串 <code>s</code>，找到 <code>s</code> 中最长的 <span data-keyword=\"palindromic-string\">回文</span> <span data-keyword=\"substring-nonempty\">子串</span>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"babad\"\n<strong>输出：</strong>\"bab\"\n<strong>解释：</strong>\"aba\" 同样是符合题意的答案。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"cbbd\"\n<strong>输出：</strong>\"bb\"\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 1000</code></li>\n\t<li><code>s</code> 仅由数字和英文字母组成</li>\n</ul>",
  "code": "class Solution {\npublic:\n    pair<int, int> expandAroundCenter(const string& s, int left, int right) {\n        while (left >= 0 && right < s.size() && s[left] == s[right]) {\n            --left;\n            ++right;\n        }\n        return {left + 1, right - 1}; // 退出时多扩了一步，往回收一格才是回文边界\n    }\n\n    string longestPalindrome(string s) {\n        int start = 0, end = 0;\n        for (int i = 0; i < s.size(); ++i) {\n            auto [left1, right1] = expandAroundCenter(s, i, i);     // 奇数长度：单字符中心\n            auto [left2, right2] = expandAroundCenter(s, i, i + 1); // 偶数长度：双字符中心\n            if (right1 - left1 > end - start) {\n                start = left1;\n                end = right1;\n            }\n            if (right2 - left2 > end - start) {\n                start = left2;\n                end = right2;\n            }\n        }\n        return s.substr(start, end - start + 1);\n    }\n};",
  "cards": [
   {
    "id": "p5-expand-left-boundary-ge-zero",
    "crux": "expandAroundCenter 循环左边界判断",
    "answer": "left >= 0",
    "blankOffset": 118,
    "blankLen": 9,
    "options": [
     "left >= 0",
     "left > 0",
     "left >= 1"
    ],
    "why": "left 是合法下标，0 是最左侧的有效位置，必须能取到 left == 0 时的字符参与比较，所以要用 >= 0；这样在扩展到最左端后才会正确终止。",
    "wrongWhy": {
     "left > 0": "当 left 收缩到 0 时条件直接为假，跳过了本该发生的 s[0] 与 s[right] 的比较，导致以最左字符为回文一部分的情况被提前截断（例如 \"aba\" 会只扩出 \"b\"）。",
     "left >= 1": "对整数 left 而言 left >= 1 等价于 left > 0，同样在 left == 0 时提前退出循环，使包含字符串首字符的比较被跳过，回文边界计算错误。"
    }
   },
   {
    "id": "p5-expand-right-boundary-lt-size",
    "crux": "expandAroundCenter 循环右边界判断",
    "answer": "right < s.size()",
    "blankOffset": 131,
    "blankLen": 16,
    "options": [
     "right < s.size()",
     "right >= s.size()",
     "right < s.size() - 1"
    ],
    "why": "right 必须严格小于 s.size() 才是有效字符下标；s.size() 是末尾之后的位置，不是有效字符下标，这样才能保证 s[right] 始终落在有效范围内。",
    "wrongWhy": {
     "right >= s.size()": "把比较方向写反了：right 的初值（i 或 i+1）通常小于 s.size()，right >= s.size() 一开始就为假，配合 && 短路会让整个 while 循环体一次都不执行，每次扩展都返回长度为负的空区间，最终只会返回首字符这种错误结果。",
     "right < s.size() - 1": "少判断了最后一个合法下标 s.size()-1，当回文触及字符串末尾时会提前一步停止扩展，漏掉靠右端的回文（例如 \"abba\"、\"noon\" 会被截短成 \"bb\"、\"oo\"，得不到完整偶数回文）。"
    }
   },
   {
    "id": "p5-expand-return-shrink-back-one",
    "crux": "expandAroundCenter 返回时回收一格",
    "answer": "{left + 1, right - 1}",
    "blankOffset": 240,
    "blankLen": 21,
    "options": [
     "{left + 1, right - 1}",
     "{left, right}",
     "{left - 1, right + 1}"
    ],
    "why": "while 循环是在字符不匹配或越界后才退出的，此时 left/right 已经多走了一步（指向了不满足回文条件的位置），所以真正的回文边界要各往回收一格，即 left+1 和 right-1。",
    "wrongWhy": {
     "{left, right}": "直接用退出时的 left/right（此时可能已越界，比如 left == -1），会把不匹配甚至越界的位置当成回文边界，导致区间多包含非回文字符或下标非法。",
     "{left - 1, right + 1}": "退出循环时 left/right 已经越过回文边界一格，正确做法是各往回收一格得到 {left+1, right-1}；而 {left-1, right+1} 反而朝外再扩一格，区间比正确边界每侧还各宽一格，纳入了根本不满足回文条件的字符，且 left-1 可能变成 -2 造成下标越界。"
    }
   },
   {
    "id": "p5-even-center-i-plus-one",
    "crux": "偶数长度中心的第二个参数",
    "answer": "i + 1",
    "blankOffset": 554,
    "blankLen": 5,
    "options": [
     "i + 1",
     "i + 2",
     "i"
    ],
    "why": "偶数长度回文的中心在两个相邻字符之间，需要以 (i, i+1) 这一对相邻下标作为扩展起点，才能正确表示这个居中位置。",
    "wrongWhy": {
     "i + 2": "以 (i, i+2) 扩展会跳过中间的 s[i+1]，把相隔一个字符的两端当作中心，这既不是奇数中心也不是相邻双字符的偶数中心，无法表示偶数长度回文，会漏掉像 \"abba\"、\"noon\" 这类偶数回文（例如把 \"abba\" 只算出长度 1）。",
     "i": "与前一行的奇数中心调用完全重复，等于没有做偶数中心扩展，会漏掉所有偶数长度的回文（例如漏判 \"abba\"）。"
    }
   },
   {
    "id": "p5-substr-length-plus-one",
    "crux": "substr 截取长度计算",
    "answer": "end - start + 1",
    "blankOffset": 863,
    "blankLen": 15,
    "options": [
     "end - start + 1",
     "end - start",
     "end - start - 1"
    ],
    "why": "start 和 end 是回文闭区间的两端下标，闭区间 [start, end] 的元素个数（即子串长度）应为 end - start + 1。",
    "wrongWhy": {
     "end - start": "长度少算了 1，substr 会少截取回文的最后一个字符，返回的子串不完整。",
     "end - start - 1": "长度少算了 2，返回的子串会比真正的最长回文短两个字符，明显错误。"
    }
   }
  ]
 },
 {
  "id": 11,
  "title": "11. 盛最多水的容器",
  "category": "双指针",
  "difficulty": "medium",
  "descHtml": "<p>给定一个长度为 <code>n</code> 的整数数组&nbsp;<code>height</code>&nbsp;。有&nbsp;<code>n</code>&nbsp;条垂线，第 <code>i</code> 条线的两个端点是&nbsp;<code>(i, 0)</code>&nbsp;和&nbsp;<code>(i, height[i])</code>&nbsp;。</p>\n\n<p>找出其中的两条线，使得它们与&nbsp;<code>x</code>&nbsp;轴共同构成的容器可以容纳最多的水。</p>\n\n<p>返回容器可以储存的最大水量。</p>\n\n<p><strong>说明：</strong>你不能倾斜容器。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>[1,8,6,2,5,4,8,3,7]\n<strong>输出：</strong>49 \n<strong>解释：</strong>图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为&nbsp;49。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>height = [1,1]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1;\n        int ans = 0;\n        while (l < r) {\n            int area = min(height[l], height[r]) * (r - l);\n            ans = max(ans, area);\n            if (height[l] <= height[r]) { // 移动较矮的一侧，面积才可能变大\n                ++l;\n            }\n            else {\n                --r;\n            }\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p11-right-pointer-init-size-minus-1",
    "crux": "右指针初始值必须是 size()-1，多减/漏减 1 都会导致越界或漏掉最右列",
    "answer": "height.size() - 1",
    "blankOffset": 87,
    "blankLen": 17,
    "options": [
     "height.size() - 1",
     "height.size()",
     "height.size() - 2"
    ],
    "why": "数组下标从 0 到 size()-1，r 要指向最右侧的柱子才能覆盖最宽的初始区间；写成 height.size() 会在首次访问 height[r] 时越界，写成 height.size()-2 则漏掉最右边一列，可能漏掉包含它的更优解。",
    "wrongWhy": {
     "height.size()": "越界访问 height[height.size()]，行为未定义（数组越界），且宽度 r-l 也会多算 1。",
     "height.size() - 2": "r 少了 1，最右侧那根柱子永远不会被 l 或 r 指到，若最优解恰好用到最后一列会被漏掉。"
    }
   }
  ]
 },
 {
  "id": 15,
  "title": "15. 三数之和",
  "category": "双指针",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，判断是否存在三元组 <code>[nums[i], nums[j], nums[k]]</code> 满足 <code>i != j</code>、<code>i != k</code> 且 <code>j != k</code> ，同时还满足 <code>nums[i] + nums[j] + nums[k] == 0</code> 。请你返回所有和为 <code>0</code> 且不重复的三元组。</p>\n\n<p><strong>注意：</strong>答案中不可以包含重复的三元组。</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-1,0,1,2,-1,-4]\n<strong>输出：</strong>[[-1,-1,2],[-1,0,1]]\n<strong>解释：</strong>\nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。\n不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。\n注意，输出的顺序和三元组的顺序并不重要。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1,1]\n<strong>输出：</strong>[]\n<strong>解释：</strong>唯一可能的三元组和不为 0 。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,0,0]\n<strong>输出：</strong>[[0,0,0]]\n<strong>解释：</strong>唯一可能的三元组和为 0 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>3 &lt;= nums.length &lt;= 3000</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        int n = nums.size();\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> ans;\n        // 枚举 a\n        for (int first = 0; first < n; ++first) {\n            // 需要和上一次枚举的数不相同\n            if (first > 0 && nums[first] == nums[first - 1]) {\n                continue;\n            }\n            // c 对应的指针初始指向数组的最右端\n            int third = n - 1;\n            int target = -nums[first];\n            // 枚举 b\n            for (int second = first + 1; second < n; ++second) {\n                // 需要和上一次枚举的数不相同\n                if (second > first + 1 && nums[second] == nums[second - 1]) {\n                    continue;\n                }\n                // 需要保证 b 的指针在 c 的指针的左侧\n                while (second < third && nums[second] + nums[third] > target) {\n                    --third;\n                }\n                // 如果指针重合，随着 b 后续的增加\n                // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环\n                if (second == third) {\n                    break;\n                }\n                if (nums[second] + nums[third] == target) {\n                    ans.push_back({nums[first], nums[second], nums[third]});\n                }\n            }\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p15-dedup-first-guard-and-prev-index",
    "crux": "外层去重条件 first > 0 && nums[first] == nums[first - 1]",
    "answer": "first > 0 && nums[first] == nums[first - 1]",
    "blankOffset": 292,
    "blankLen": 43,
    "options": [
     "first > 0 && nums[first] == nums[first - 1]",
     "first >= 0 && nums[first] == nums[first - 1]",
     "first > 0 && nums[first] == nums[first + 1]",
     "nums[first] == nums[first - 1]"
    ],
    "why": "去重要求「跳过与上一个 a 相同的值」，必须先保证 first > 0 才能安全访问 nums[first - 1]；first == 0 时没有上一个元素，条件短路为 false 才不会越界访问 nums[-1]。",
    "wrongWhy": {
     "first >= 0 && nums[first] == nums[first - 1]": "first == 0 时该条件为真会去访问 nums[-1]，直接数组越界（未定义行为），比正确写法多出一次非法访问。",
     "first > 0 && nums[first] == nums[first + 1]": "把「上一个」写成「下一个」，比较的是还未处理过的元素，无法正确跳过与前一个相同的 a，导致重复三元组未被去重。",
     "nums[first] == nums[first - 1]": "缺少 first > 0 的前置守卫，first == 0 时会直接访问 nums[-1] 造成越界。"
    }
   },
   {
    "id": "p15-dedup-second-offset-from-first",
    "crux": "内层去重条件里的偏移量 second > first + 1",
    "answer": "second > first + 1",
    "blankOffset": 620,
    "blankLen": 18,
    "options": [
     "second > first + 1",
     "second > first",
     "second >= first + 1",
     "second > 0"
    ],
    "why": "second 每轮从 first + 1 开始，只有当 second 已经越过本轮起始位置至少一步（即 second > first + 1）时，nums[second - 1] 才是「本轮内上一次枚举的 b」；写成 second > first 会让 second == first + 1（本轮第一个 b）时也去比较 nums[second - 1]（其实是 nums[first]，即 a 本身），把本应保留的第一个 b 误判为重复而跳过。",
    "wrongWhy": {
     "second > first": "second == first + 1（本轮第一个 b）时条件也成立，此时 nums[second - 1] 就是 nums[first]，如果二者恰好相等会把本轮合法的第一个 b 误跳过，漏解。",
     "second >= first + 1": "等价于 second > first，同样会在本轮第一个 b（second == first + 1）时触发比较，把 nums[first] 误当成「上一次的 b」来去重，导致漏解。",
     "second > 0": "该条件几乎恒为真（second 从 first+1 起步本就大于 0），退化成只按 nums[second] == nums[second-1] 去重，会误伤跨越不同 first 轮次或起始位置的合法值。"
    }
   },
   {
    "id": "p15-third-pointer-init-right-end",
    "crux": "third 指针的初始值 n - 1",
    "answer": "n - 1",
    "blankOffset": 436,
    "blankLen": 5,
    "options": [
     "n - 1",
     "n",
     "n - 2",
     "nums.size()"
    ],
    "why": "third 要指向数组最右端的合法下标，数组长度为 n 时最后一个元素下标是 n - 1；这是后续 nums[third] 访问不越界的前提。",
    "wrongWhy": {
     "n": "n 不是合法下标（数组下标范围是 0 到 n-1），第一次访问 nums[third] 就会越界读取。",
     "n - 2": "少覆盖了最右端的元素，会漏掉以最后一个元素作为 c 的所有可能解。",
     "nums.size()": "与 n 等价（n 就是 nums.size()），同样是非法下标，访问 nums[third] 越界。"
    }
   },
   {
    "id": "p15-third-pointer-shrink-loop-condition",
    "crux": "双指针收缩循环的条件 second < third",
    "answer": "second < third",
    "blankOffset": 789,
    "blankLen": 14,
    "options": [
     "second < third",
     "second <= third",
     "second > third",
     "third > 0"
    ],
    "why": "题解讲解指出「需要保证 b 的指针在 c 的指针的左侧」，所以收缩 third 的前提必须是 second 严格小于 third；一旦 second == third 就该停止收缩，交由后面的相遇判断处理，避免同一个下标被当成 b 和 c 两次使用。",
    "wrongWhy": {
     "second <= third": "允许 second == third 时继续判断 nums[second] + nums[third]，此时其实是同一个下标的元素被同时当成 b 和 c 计算，逻辑上不再是「两个不同位置」，可能多减一次 third 导致 third 跑到 second 左边，后续访问关系错乱。",
     "second > third": "方向反了，two-pointer 本应在 second < third 时收缩，写反后循环条件在正常情况下几乎从不成立（或成立时机完全错误），third 无法正确单调左移。",
     "third > 0": "丢失了「second 必须在 third 左侧」这一核心约束，third 可能被收缩到 second 左边甚至更远，导致 nums[second] 与 nums[third] 顺序错乱、结果错误。"
    }
   },
   {
    "id": "p15-pointer-meet-break-condition",
    "crux": "指针相遇时退出内层循环的判断 second == third",
    "answer": "second == third",
    "blankOffset": 1004,
    "blankLen": 15,
    "options": [
     "second == third",
     "second < third",
     "second > third",
     "second != third"
    ],
    "why": "题解讲解说明「如果指针重合，随着 b 后续的增加就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环」，因为 third 全程单调不回退，一旦 second 追上 third（相等），之后 second 继续增大只会让 b<c 不再可能，此时用相等判断精确捕捉「刚好相遇」这一时刻。",
    "wrongWhy": {
     "second < third": "second < third 恰是双指针仍需继续比较的正常状态，一进入循环体就 break 会让绝大多数合法的 b、c 组合根本没机会被检查，直接漏掉几乎所有解。",
     "second > third": "由于 third 只在 second < third 时才左移，second 永远不会真正超过 third（至多相等），该条件几乎恒不成立，相遇时无法 break，会继续对同一下标做 nums[second] + nums[third] 判断并产生非预期的「三元组」。",
     "second != third": "把该退出的条件写反，导致本应退出的场合仍在循环、本不该退出的场合反而 break，内层双指针逻辑完全错乱。"
    }
   }
  ]
 },
 {
  "id": 17,
  "title": "17. 电话号码的字母组合",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给定一个仅包含数字&nbsp;<code>2-9</code>&nbsp;的字符串，返回所有它能表示的字母组合。答案可以按 <strong>任意顺序</strong> 返回。</p>\n\n<p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。</p>\n\n<p></p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>digits = \"23\"\n<strong>输出：</strong>[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>digits = \"2\"\n<strong>输出：</strong>[\"a\",\"b\",\"c\"]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= digits.length &lt;= 4</code></li>\n\t<li><code>digits[i]</code> 是范围 <code>['2', '9']</code> 的一个数字。</li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        vector<string> combinations;\n        if (digits.empty()) {\n            return combinations;\n        }\n        unordered_map<char, string> phoneMap{\n            {'2', \"abc\"},\n            {'3', \"def\"},\n            {'4', \"ghi\"},\n            {'5', \"jkl\"},\n            {'6', \"mno\"},\n            {'7', \"pqrs\"},\n            {'8', \"tuv\"},\n            {'9', \"wxyz\"}\n        };\n        string combination;\n        backtrack(combinations, phoneMap, digits, 0, combination);\n        return combinations;\n    }\n\n    void backtrack(vector<string>& combinations, const unordered_map<char, string>& phoneMap, const string& digits, int index, string& combination) {\n        if (index == digits.length()) {\n            combinations.push_back(combination);\n        } else {\n            char digit = digits[index];\n            const string& letters = phoneMap.at(digit);\n            for (const char& letter: letters) {\n                combination.push_back(letter);\n                backtrack(combinations, phoneMap, digits, index + 1, combination);\n                combination.pop_back(); // 撤销本层选择\n            }\n        }\n    }\n};",
  "cards": [
   {
    "id": "p17-digits-empty-guard",
    "crux": "digits 为空时必须直接返回空数组，不能继续走回溯（否则会得到含一个空串的错误结果）",
    "answer": "digits.empty()",
    "blankOffset": 129,
    "blankLen": 14,
    "options": [
     "digits.empty()",
     "digits.size() == 1",
     "!digits.empty()",
     "combinations.empty()"
    ],
    "why": "solutionText 明确指出易错点：digits 为空要直接返回空数组，而不是含空串的数组。若不判空直接调用 backtrack，index==0==digits.length() 会立刻把当前空的 combination（空串）push 进结果，导致返回 [\"\"] 而不是 []。",
    "wrongWhy": {
     "digits.size() == 1": "条件语义完全错误，把长度为1的正常输入也当成空来提前返回，漏掉本应产生的字母组合。",
     "!digits.empty()": "取反后逻辑颠倒，非空时才提前返回空数组，真正为空时反而继续执行 backtrack，得到错误的 [\"\"] 结果。",
     "combinations.empty()": "combinations 此处刚声明、恒为空，该条件永远为真，会对任何输入都提前返回空数组，彻底破坏功能。"
    }
   },
   {
    "id": "p17-backtrack-base-case",
    "crux": "回溯终止条件必须是 index == digits.length()，多一步或少一步都会导致数组越界或漏收/多收结果",
    "answer": "index == digits.length()",
    "blankOffset": 749,
    "blankLen": 24,
    "options": [
     "index == digits.length()",
     "index < digits.length()",
     "index == digits.length() - 1",
     "index > digits.length()"
    ],
    "why": "hints 中说明 backtrack(index)：index==digits.length() 时收录答案。此时 combination 长度恰好等于 digits 长度，是唯一正确的完整组合时机；用 == 精确匹配即可，因为 index 每次只 +1，不会跳过该值。",
    "wrongWhy": {
     "index < digits.length()": "把条件写反：只在还没处理完（index 未到末尾）时就收录不完整的组合，而真正走到末尾时反而进入 else 分支访问越界的 digits[index]，逻辑完全颠倒。",
     "index == digits.length() - 1": "会在还差最后一位字母时就提前收录组合，导致每个结果都少拼接最后一个字符，且 digits[index] 访问的字母未被使用。",
     "index > digits.length()": "条件永远不会成立（index 递增到 length 就应该停止递归），导致 base case 失效，递归会继续对不存在的 digits[index] 取值造成越界访问。"
    }
   },
   {
    "id": "p17-recursion-index-increment",
    "crux": "递归进入下一位必须传 index + 1，否则会死循环重复处理同一位数字",
    "answer": "index + 1",
    "blankOffset": 1092,
    "blankLen": 9,
    "options": [
     "index + 1",
     "index",
     "index - 1",
     "index++"
    ],
    "why": "hints 明确写道：push_back → 递归 index+1 → pop_back 撤销。index+1 表示进入处理下一个数字，保证递归最终能走到 index==digits.length() 的终止条件。",
    "wrongWhy": {
     "index": "不推进位置会导致对同一个数字反复递归，形成无限递归直至栈溢出，且组合长度会无限增长。",
     "index - 1": "递归会向前回退到已经处理过的数字，同样导致死循环甚至负数下标越界访问 digits。",
     "index++": "index++ 是后置自增表达式，作为函数参数传入时传的是自增前的值（等价于传入 index 本身），同时副作用修改了外层 index，会打乱 for 循环里后续对 index 的使用，属于典型误用。"
    }
   }
  ]
 },
 {
  "id": 19,
  "title": "19. 删除链表的倒数第 N 个结点",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给你一个链表，删除链表的倒数第&nbsp;<code>n</code><em>&nbsp;</em>个结点，并且返回链表的头结点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], n = 2\n<strong>输出：</strong>[1,2,3,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1], n = 1\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], n = 1\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中结点的数目为 <code>sz</code></li>\n\t<li><code>1 &lt;= sz &lt;= 30</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n\t<li><code>1 &lt;= n &lt;= sz</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能尝试使用一趟扫描实现吗？</p>",
  "code": "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode* dummy = new ListNode(0, head);\n        ListNode* first = head;\n        ListNode* second = dummy;\n        for (int i = 0; i < n; ++i) { // first 先走 n 步，保持与 second 间距为 n\n            first = first->next;\n        }\n        while (first) {\n            first = first->next;\n            second = second->next;\n        }\n        second->next = second->next->next; // 此时 second 恰是待删节点的前驱\n        ListNode* ans = dummy->next;\n        delete dummy;\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p19-second-start-from-dummy",
    "crux": "second 指针必须从哨兵 dummy 出发，而不是从 head 出发",
    "answer": "dummy",
    "blankOffset": 189,
    "blankLen": 5,
    "options": [
     "dummy",
     "head",
     "first",
     "dummy->next"
    ],
    "why": "哨兵节点的作用就是让 second 比 first 天然多退一步：first 先走 n 步后与 second 同速前进直到 first 为空，这时 second 恰好停在待删节点的前驱。若 second 从 dummy 出发，即使要删除的是头节点（n 等于链长），second 最终也会稳稳停在 dummy 上，不会越界；这正是 hints 里强调「加哨兵节点保证删头节点无需特判」的原因。",
    "wrongWhy": {
     "head": "second 从 head 出发就少了哨兵带来的那一步偏移，first 与 second 的间距只有 n（而非 n+1）。first 走到 nullptr 时 second 停在待删节点本身而不是它的前驱，second->next = second->next->next 会删掉待删节点的后一个节点（删错）；当待删的正是最后一个节点（n=1）时 second->next 为空，second->next->next 解引用空指针直接崩溃。",
     "first": "在这行 first 就是 head，写 second = first 等价于 second = head，犯的是和选 head 完全一样的错误：间距少了一步，second 最终停在待删节点本身而非其前驱，删错节点，n=1 时还会空指针崩溃。",
     "dummy->next": "dummy->next 就是 head，等价于让 second 从 head 出发，与直接写 head 犯的错误相同：间距少一步导致删错节点，删除最后一个节点（n=1）时 second->next 为空，再取 next 崩溃。"
    }
   },
   {
    "id": "p19-for-loop-strictly-less-than-n",
    "crux": "first 先走的循环条件是 i < n（恰好走 n 步），不能多走或少走",
    "answer": "<",
    "blankOffset": 222,
    "blankLen": 1,
    "options": [
     "<",
     "<=",
     ">",
     ">="
    ],
    "why": "循环体从 i=0 执行到 i=n-1，恰好执行 n 次，这样 first 比 second（此时还在 dummy）多走了 n 步，建立起题解要求的「first 与 second 间距为 n」，后续同步前进才能让 second 精确停在倒数第 n 个节点的前驱。",
    "wrongWhy": {
     "<=": "循环多执行一次，first 会多走一步，间距变成 n+1，导致后续 second 最终停留的位置整体偏移一位；若 n 恰为链表长度，first 在多走的那一步就会对 nullptr 取 next，直接崩溃。",
     ">": "当 n>=1 时 0>n 不成立，循环体一次都不执行，first 完全不会前进，first 与 second 之间没有建立任何间距，后面的同步移动会定位到完全错误的节点。",
     ">=": "同样在 n>=1 时循环体几乎不执行（i=0 时 0>=n 不成立），first 不会先行移动，破坏了双指针保持固定间距 n 的前提。"
    }
   },
   {
    "id": "p19-while-loop-checks-first-not-first-next",
    "crux": "同步前进的循环要判断 first 是否为空，不能判断 first->next",
    "answer": "first",
    "blankOffset": 325,
    "blankLen": 5,
    "options": [
     "first",
     "first->next",
     "second",
     "second->next"
    ],
    "why": "要让 first 真正走到链表末尾之外（first 为 nullptr）才停止同步移动，这样 second 相对 first 少走的那 n 步正好让它停在待删节点的前驱上，这是 solutionText 中「first 到 nullptr 时 second 恰好停在待删节点的前驱」的直接体现。",
    "wrongWhy": {
     "first->next": "循环会在 first 到达链表最后一个节点时就提前结束（此时 first->next 为空），比正确情况少移动一步，second 最终停在待删节点前驱的前一个节点，导致后面的删除操作实际删掉了错误的节点。",
     "second": "循环的推进与终止依据应该是先行指针 first 是否越界，而不是 second；用 second 作为终止条件无法保证 first 已经走到链表末尾，位置对应关系彻底错乱。",
     "second->next": "同样是拿 second 的状态判断循环是否继续，没有正确反映 first 是否已经走出链表，导致 first、second 之间的相对位置计算错误。"
    }
   },
   {
    "id": "p19-delete-skip-exactly-one-node",
    "crux": "删除操作要跳过待删节点一次，让 second->next 指向 second->next->next",
    "answer": "second->next->next",
    "blankOffset": 435,
    "blankLen": 18,
    "options": [
     "second->next->next",
     "second->next",
     "second->next->next->next",
     "second"
    ],
    "why": "此时 second 是待删节点的前驱，待删节点就是 second->next；要把它从链表中摘除，需要让 second->next 直接指向待删节点之后的节点，也就是 second->next->next，这样待删节点被跳过、不再被任何指针指向。",
    "wrongWhy": {
     "second->next": "相当于把 second->next 赋值成它自身，链表结构完全没有变化，待删节点仍然留在链表中，等于没有执行任何删除操作。",
     "second->next->next->next": "多跳了一层，会把待删节点之后本该保留的下一个正常节点也从链表中摘除，造成误删相邻节点。",
     "second": "把 second 自身的 next 指向 second 自己，形成自环，之后再遍历这条链表会陷入死循环，且待删节点也没有被真正移除。"
    }
   }
  ]
 },
 {
  "id": 20,
  "title": "20. 有效的括号",
  "category": "栈",
  "difficulty": "easy",
  "descHtml": "<p>给定一个只包括 <code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code>&nbsp;的字符串 <code>s</code> ，判断字符串是否有效。</p>\n\n<p>有效字符串需满足：</p>\n\n<ol>\n\t<li>左括号必须用相同类型的右括号闭合。</li>\n\t<li>左括号必须以正确的顺序闭合。</li>\n\t<li>每个右括号都有一个对应的相同类型的左括号。</li>\n</ol>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"()\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"()[]{}\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"(]\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>false</span></p>\n</div>\n\n<p><strong class=\"example\">示例 4：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"([])\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>true</span></p>\n</div>\n\n<p><strong class=\"example\">示例 5：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>s = \"([)]\"</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>false</span></p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>s</code> 仅由括号 <code>'()[]{}'</code> 组成</li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool isValid(string s) {\n        int n = s.size();\n        if (n % 2 == 1) {\n            return false;\n        }\n\n        unordered_map<char, char> pairs = {\n            {')', '('},\n            {']', '['},\n            {'}', '{'}\n        };\n        stack<char> stk;\n        for (char ch: s) {\n            if (pairs.count(ch)) {\n                if (stk.empty() || stk.top() != pairs[ch]) { // 栈顶必须恰是当前右括号对应的左括号\n                    return false;\n                }\n                stk.pop();\n            }\n            else {\n                stk.push(ch);\n            }\n        }\n        return stk.empty();\n    }\n};",
  "cards": [
   {
    "id": "p20-odd-length-early-return",
    "crux": "长度奇偶性判断的条件写反,会让奇偶两种情况的处理完全颠倒",
    "answer": "n % 2 == 1",
    "blankOffset": 92,
    "blankLen": 10,
    "options": [
     "n % 2 == 1",
     "n % 2 == 0",
     "n == 1",
     "n < 2"
    ],
    "why": "有效括号字符串必然由左右括号一一配对组成,长度必为偶数;solutionText明确说明「长度为奇数可在开头直接返回 false」,因此这里要判断的是「长度为奇数」,即 n % 2 == 1。",
    "wrongWhy": {
     "n % 2 == 0": "条件反了:会在长度为偶数(可能有效)时直接返回false,而长度为奇数(一定无效)时反而放行进入后续栈匹配逻辑,完全颠倒判断方向",
     "n == 1": "只判断长度恰好为1的特例,无法拦截长度为3、5、7等其他奇数长度的非法输入",
     "n < 2": "判断的是长度是否小于2,与奇偶性无关,长度为0或1时行为都不对(空串本应有效,长度1必然无效但原因不是<2而是奇数)"
    }
   },
   {
    "id": "p20-stack-empty-check-order",
    "crux": "短路求值的顺序:必须先判栈空再取栈顶,否则空栈调用top()是未定义行为",
    "answer": "stk.empty() || stk.top() != pairs[ch]",
    "blankOffset": 376,
    "blankLen": 37,
    "options": [
     "stk.empty() || stk.top() != pairs[ch]",
     "stk.top() != pairs[ch] || stk.empty()",
     "stk.empty() && stk.top() != pairs[ch]",
     "!stk.empty() || stk.top() != pairs[ch]"
    ],
    "why": "hints明确提示「遇右括号若栈空或 stk.top() != pairs[ch] 立刻返回 false」;C++的||是短路求值,先判 stk.empty() 为真时就不再执行 stk.top(),避免对空栈取栈顶这一未定义行为,同时保证栈空这种非法情况也能被正确拦截。",
    "wrongWhy": {
     "stk.top() != pairs[ch] || stk.empty()": "顺序颠倒后,当栈为空时会先执行 stk.top(),对空栈取栈顶是未定义行为,可能崩溃或读到脏数据导致判断错误",
     "stk.empty() && stk.top() != pairs[ch]": "把||错写成&&,逻辑变成「栈空且栈顶不匹配」才非法;且&&同样不短路跳过top()(栈空为true时仍会继续求值第二个条件),既逻辑错误又依旧访问空栈",
     "!stk.empty() || stk.top() != pairs[ch]": "多加了取反,导致只要栈非空就直接判为非法,几乎所有正常的括号匹配都会被误判为无效"
    }
   },
   {
    "id": "p20-final-stack-empty-check",
    "crux": "遍历结束后必须检查栈是否清空,遗留未匹配的左括号也算无效",
    "answer": "stk.empty()",
    "blankOffset": 619,
    "blankLen": 11,
    "options": [
     "stk.empty()",
     "true",
     "!stk.empty()",
     "stk.size() == 1"
    ],
    "why": "hints指出「循环结束还要检查 stk.empty()——有剩余左括号也不合法」;如果遍历完字符串后栈里还留有未配对的左括号(如输入\"(((\"),应判为无效,因此必须返回 stk.empty() 而不是直接认为合法。",
    "wrongWhy": {
     "true": "彻底忘记检查栈是否清空,导致像\"(((\"或\"([\"这种含未匹配左括号的非法字符串被误判为有效",
     "!stk.empty()": "逻辑完全反了:栈为空(真正有效)时返回false,栈非空(有未匹配左括号,本应无效)时反而返回true",
     "stk.size() == 1": "错误地把「有效」等同于「栈里恰好剩1个元素」,既不能正确判断栈为空的有效情况,也无法处理剩余多个未匹配左括号的情形"
    }
   }
  ]
 },
 {
  "id": 21,
  "title": "21. 合并两个有序链表",
  "category": "链表",
  "difficulty": "easy",
  "descHtml": "<p>将两个升序链表合并为一个新的 <strong>升序</strong> 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 </p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [1,2,4], l2 = [1,3,4]\n<strong>输出：</strong>[1,1,2,3,4,4]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [], l2 = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>l1 = [], l2 = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>两个链表的节点数目范围是 <code>[0, 50]</code></li>\n\t<li><code>-100 <= Node.val <= 100</code></li>\n\t<li><code>l1</code> 和 <code>l2</code> 均按 <strong>非递减顺序</strong> 排列</li>\n</ul>",
  "code": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode* preHead = new ListNode(-1); // 哨兵节点，免去头节点特判\n\n        ListNode* prev = preHead;\n        while (l1 != nullptr && l2 != nullptr) {\n            if (l1->val < l2->val) {\n                prev->next = l1;\n                l1 = l1->next;\n            } else {\n                prev->next = l2;\n                l2 = l2->next;\n            }\n            prev = prev->next;\n        }\n\n        // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可\n        prev->next = l1 == nullptr ? l2 : l1;\n\n        return preHead->next;\n    }\n};",
  "cards": [
   {
    "id": "p21-merge-while-and-or",
    "crux": "while循环条件必须用&&而非||，否则某条链表已空时会解引用空指针",
    "answer": "&&",
    "blankOffset": 209,
    "blankLen": 2,
    "options": [
     "&&",
     "||"
    ],
    "why": "必须保证l1和l2都非空时才能继续比较l1->val与l2->val，只要有一条链已经走完（变成nullptr），就不能再解引用它，应该跳出循环把剩余的另一条链整体挂上去，所以条件要用&&（两者都非空才继续）。",
    "wrongWhy": {
     "||": "只要有一条不为空就会继续进入循环体去比较，一旦l1或l2已经为nullptr，l1->val或l2->val就是空指针解引用，程序直接崩溃。"
    }
   },
   {
    "id": "p21-merge-compare-lt",
    "crux": "比较用<（小者先接），写反成>会让结果变成非升序",
    "answer": "<",
    "blankOffset": 253,
    "blankLen": 1,
    "options": [
     "<",
     ">"
    ],
    "why": "要维持合并后链表整体有序（非递减），每一步都必须把当前两个候选节点里较小的那个接到结果尾部，所以用<挑出更小值。",
    "wrongWhy": {
     ">": "会把较大的值先接到结果链表尾部，导致合并结果不再是有序（非递减）序列，破坏了归并的正确性。"
    }
   },
   {
    "id": "p21-merge-tail-ternary",
    "crux": "剩余链拼接的三元表达式方向：l1为空则接l2，写反会丢掉未走完的那条链",
    "answer": "l1 == nullptr ? l2 : l1",
    "blankOffset": 549,
    "blankLen": 23,
    "options": [
     "l1 == nullptr ? l2 : l1",
     "l1 == nullptr ? l1 : l2"
    ],
    "why": "循环结束时l1和l2中至多一个还有剩余节点：如果l1已经为nullptr，说明l2还没走完，应该把prev->next指向l2；反之则指向l1，这样能把剩余链表整体一次性挂上，不用逐个搬运。",
    "wrongWhy": {
     "l1 == nullptr ? l1 : l2": "写反后，当l1为nullptr时会执行prev->next = l1，也就是把nullptr接到结果末尾，直接丢弃了l2剩余的全部节点。"
    }
   }
  ]
 },
 {
  "id": 22,
  "title": "22. 括号生成",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>数字 <code>n</code>&nbsp;代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 <strong>有效的 </strong>括号组合。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 3\n<strong>输出：</strong>[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 1\n<strong>输出：</strong>[\"()\"]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 8</code></li>\n</ul>",
  "code": "class Solution {\n    void backtrack(vector<string>& ans, string& cur, int open, int close, int n) {\n        if (cur.size() == n * 2) {\n            ans.push_back(cur);\n            return;\n        }\n        if (open < n) {\n            cur.push_back('(');\n            backtrack(ans, cur, open + 1, close, n);\n            cur.pop_back();\n        }\n        if (close < open) { // 右括号不能多于左括号，保证前缀合法\n            cur.push_back(')');\n            backtrack(ans, cur, open, close + 1, n);\n            cur.pop_back();\n        }\n    }\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> result;\n        string current;\n        backtrack(result, current, 0, 0, n);\n        return result;\n    }\n};",
  "cards": [
   {
    "id": "p22-right-paren-guard-close-lt-open",
    "crux": "右括号只能在 close < open 时放",
    "answer": "close < open",
    "blankOffset": 356,
    "blankLen": 12,
    "options": [
     "close < open",
     "close <= open",
     "open < close",
     "close < n"
    ],
    "why": "放右括号前当前右括号数必须严格小于左括号数（close < open），这样放入后仍满足右括号数不超过左括号数，是保证任意前缀合法的核心不变量，题解和 hints 都明确指出这一点。",
    "wrongWhy": {
     "close <= open": "当 close == open 时也允许放右括号，会使新前缀出现 close > open（如 '()' 再放 ')' 变成 '())'），产生非法前缀。",
     "open < close": "条件方向反了，只有右括号数已经超过左括号数时才放右括号，实际上永远不会满足，导致右括号永远放不出来。",
     "close < n": "用总数 n 而非 open 做上限，右括号数可能超过当前已放的左括号数（如 open=1 时 close 仍可以增长到接近 n），破坏前缀合法性。"
    }
   },
   {
    "id": "p22-left-paren-guard-open-lt-n",
    "crux": "左括号只能在 open < n 时放",
    "answer": "open < n",
    "blankOffset": 209,
    "blankLen": 8,
    "options": [
     "open < n",
     "open <= n",
     "open < close",
     "close < n"
    ],
    "why": "左括号总数不能超过 n，用 open < n 保证还有剩余左括号名额可放；open 等于 n 时必须停止放左括号，这是构造合法括号串的另一半约束。",
    "wrongWhy": {
     "open <= n": "open == n 时仍会多放一个左括号，导致左括号总数变成 n+1，破坏 n 对左括号数的约束。",
     "open < close": "用 close 而非 n 判断左括号是否放够，语义完全错误，会使左括号数量随 close 变化，无法正确限制在 n 个以内。",
     "close < n": "用 close 代替 open 判断左括号名额，逻辑上与左括号数量无关，可能导致左括号超过 n 或过早停止。"
    }
   },
   {
    "id": "p22-base-case-length-n-times-2",
    "crux": "终止条件是长度达到 n*2",
    "answer": "n * 2",
    "blankOffset": 126,
    "blankLen": 5,
    "options": [
     "n * 2",
     "n",
     "2 * n - 1",
     "n + 1"
    ],
    "why": "一个合法括号串由 n 个左括号和 n 个右括号组成，总长度恰好是 2n，只有长度达到 2n 时才是一个完整的括号串，可以收录进结果。",
    "wrongWhy": {
     "n": "长度仅为 n 时括号串还远未放满左右括号（只放完左右括号的一半），提前收录会得到不完整、非法的短字符串。",
     "2 * n - 1": "长度比 2n 少 1，会在字符串还差最后一个括号时就收录，得到长度为 2n-1 的不完整括号串。",
     "n + 1": "该长度远小于 2n（n>1 时），会在括号串刚放完左括号附近就提前收录，结果既不完整也不合法。"
    }
   }
  ]
 },
 {
  "id": 23,
  "title": "23. 合并 K 个升序链表",
  "category": "链表",
  "difficulty": "hard",
  "descHtml": "<p>给你一个链表数组，每个链表都已经按升序排列。</p>\n\n<p>请你将所有链表合并到一个升序链表中，返回合并后的链表。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre><strong>输入：</strong>lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>输出：</strong>[1,1,2,3,4,4,5,6]\n<strong>解释：</strong>链表数组如下：\n[\n  1-&gt;4-&gt;5,\n  1-&gt;3-&gt;4,\n  2-&gt;6\n]\n将它们合并到一个有序链表中得到。\n1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre><strong>输入：</strong>lists = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre><strong>输入：</strong>lists = [[]]\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>k == lists.length</code></li>\n\t<li><code>0 &lt;= k &lt;= 10^4</code></li>\n\t<li><code>0 &lt;= lists[i].length &lt;= 500</code></li>\n\t<li><code>-10^4 &lt;= lists[i][j] &lt;= 10^4</code></li>\n\t<li><code>lists[i]</code> 按 <strong>升序</strong> 排列</li>\n\t<li><code>lists[i].length</code> 的总和不超过 <code>10^4</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode *a, ListNode *b) {\n        if ((!a) || (!b)) return a ? a : b;\n        ListNode head, *tail = &head, *aPtr = a, *bPtr = b;\n        while (aPtr && bPtr) {\n            if (aPtr->val < bPtr->val) {\n                tail->next = aPtr; aPtr = aPtr->next;\n            } else {\n                tail->next = bPtr; bPtr = bPtr->next;\n            }\n            tail = tail->next;\n        }\n        tail->next = (aPtr ? aPtr : bPtr);\n        return head.next;\n    }\n\n    ListNode* merge(vector <ListNode*> &lists, int l, int r) {\n        if (l == r) return lists[l];\n        if (l > r) return nullptr;\n        int mid = (l + r) >> 1; // 对半劈开两两合并，每条链只被合并 O(log k) 次\n        return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r));\n    }\n\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        return merge(lists, 0, lists.size() - 1);\n    }\n};",
  "cards": [
   {
    "id": "p23-mergetwolists-null-base-case",
    "crux": "合并两条链表时，若其中一条为空，应直接返回“非空的那一条”，三元表达式方向不能写反或漏判",
    "answer": "a ? a : b",
    "blankOffset": 114,
    "blankLen": 9,
    "options": [
     "a ? a : b",
     "a",
     "b",
     "a ? b : a"
    ],
    "why": "当 a 或 b 有一个为空时，另一个不一定为空，需要用三元表达式先判断 a 是否非空：非空则返回 a，否则(a 为空)返回 b，这样无论哪一个为空都能正确返回那条剩下的完整链表。",
    "wrongWhy": {
     "a": "若 a 恰好为空而 b 非空，直接 return a 会返回空指针，丢失 b 链表的全部节点",
     "b": "若 b 恰好为空而 a 非空，直接 return b 会返回空指针，丢失 a 链表的全部节点",
     "a ? b : a": "判断方向反了：进入此分支时 a、b 至少有一个为空。若 a 非空则另一条 b 必为空，返回 b 即返回空指针、丢失 a；若 a 为空则返回 a 本身(即空)、丢失 b。两种情况都取不到那条真正非空的链表"
    }
   },
   {
    "id": "p23-merge-range-single-list-boundary",
    "crux": "分治合并区间只剩一个下标(l==r)时才直接返回 lists[l]，必须是严格相等，不能写成 >= 或 <=",
    "answer": "l == r",
    "blankOffset": 592,
    "blankLen": 6,
    "options": [
     "l == r",
     "l >= r",
     "l <= r"
    ],
    "why": "l==r 表示当前区间恰好只包含一个链表下标，直接返回 lists[l] 是合法的单链表基例；其余情况（l<r 需要继续二分，l>r 是空区间）交给后面的分支处理，边界互不重叠。",
    "wrongWhy": {
     "l >= r": "当 lists 为空数组时初始调用是 merge(lists,0,-1)，此时 l=0、r=-1 满足 l>=r，会被误判为合法基例去访问 lists[0]，但空 vector 下标 0 越界，属于未定义行为",
     "l <= r": "只要不是 l>r 就恒为真，导致 l<r 的多元素区间也提前 return lists[l]，把区间内其它链表全部丢弃，合并结果错误"
    }
   },
   {
    "id": "p23-merge-recursion-right-half-start",
    "crux": "分治两半区间必须是 [l, mid] 和 [mid+1, r]，右半区间起点要是 mid+1，不能写成 mid 或其它值，否则区间重叠导致无限递归",
    "answer": "mid + 1",
    "blankOffset": 779,
    "blankLen": 7,
    "options": [
     "mid + 1",
     "mid",
     "mid - 1",
     "l + 1"
    ],
    "why": "左半区间是 [l, mid]，右半区间必须从 mid+1 开始，两半恰好覆盖 [l,r] 且互不重叠，这样每次递归区间长度真正减半、可以正常收敛到 l==r 的基例。",
    "wrongWhy": {
     "mid": "右半区间变成 [mid, r]，与左半 [l, mid] 在 mid 处重叠；当 l+1==r 时 mid 等于 l，两个递归调用会变成完全相同的子问题 merge(l,l) 与 merge(l,r)，区间不再收缩，导致无限递归/栈溢出",
     "mid - 1": "右半区间变成 [mid-1, r]，与左半 [l, mid] 在 mid-1、mid 处重叠，某些下标被重复合并、边界组合(如 l 与 mid-1 的相对大小)容易出现异常，导致部分链表被重复合并或结果错误",
     "l + 1": "右半区间被固定成 [l+1, r]，脱离了 mid 的二分含义，与左半 [l, mid] 在 [l+1, mid] 段大量重叠，这些下标的链表被重复合并、同一批节点被接入结果两次，破坏链表结构导致结果错误"
    }
   }
  ]
 },
 {
  "id": 24,
  "title": "24. 两两交换链表中的节点",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4]\n<strong>输出：</strong>[2,1,4,3]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1]\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目在范围 <code>[0, 100]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        ListNode* dummyHead = new ListNode(0);\n        dummyHead->next = head;\n        ListNode* temp = dummyHead; // 不变量：temp 始终指向待交换那一对的前驱\n        while (temp->next != nullptr && temp->next->next != nullptr) {\n            ListNode* node1 = temp->next;\n            ListNode* node2 = temp->next->next;\n            temp->next = node2;\n            node1->next = node2->next;\n            node2->next = node1;\n            temp = node1;\n        }\n        ListNode* ans = dummyHead->next;\n        delete dummyHead;\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p24-loop-condition-and-vs-or",
    "crux": "循环条件必须同时保证两个节点都非空，用 && 而不是 ||",
    "answer": "&&",
    "blankOffset": 245,
    "blankLen": 2,
    "options": [
     "&&",
     "||"
    ],
    "why": "每一轮交换需要 node1=temp->next 和 node2=temp->next->next 都存在，只有同时满足两个非空条件才能安全取出这一对节点进行交换，因此必须用 && 保证两个条件同时成立。",
    "wrongWhy": {
     "||": "只要其中一个条件为真就会进入循环体：当链表只剩最后一个单独节点时 temp->next 非空但 temp->next->next 为空，仍会执行 node2 = temp->next->next 得到空指针，随后对 node2 解引用（如 node2->next）导致空指针崩溃。"
    }
   },
   {
    "id": "p24-relink-node1-next-order",
    "crux": "重接指针时 node1->next 必须赋值为 node2->next（在其被覆盖前保存），而不是随意指向 node2 或已改写的 temp->next",
    "answer": "node1->next = node2->next;",
    "blankOffset": 413,
    "blankLen": 26,
    "options": [
     "node1->next = node2->next;",
     "node1->next = node2;",
     "node1->next = temp->next;"
    ],
    "why": "必须在 node2->next 被改写为 node1 之前，把它原本指向的后继节点保存到 node1->next，这样 node1 才能正确接上原链表中 node2 后面的部分，保证链表不断裂、不成环。",
    "wrongWhy": {
     "node1->next = node2;": "让 node1 指向 node2 会与刚设置的 temp->next = node2 重复，且丢失了 node2 原来的后继节点，导致这段链表之后的所有节点全部脱链丢失。",
     "node1->next = temp->next;": "此时 temp->next 已经被上一行赋值为 node2，所以这等价于 node1->next = node2，同样会丢失 node2 原来的后继节点，造成链表断裂。"
    }
   },
   {
    "id": "p24-advance-temp-to-node1",
    "crux": "每轮交换完成后要把 temp 前移到 node1（新的这对里排在后面的节点），而不是 node2 或等价写法",
    "answer": "temp = node1;",
    "blankOffset": 485,
    "blankLen": 13,
    "options": [
     "temp = node1;",
     "temp = node2;",
     "temp = temp->next;"
    ],
    "why": "交换完成后 node1 变成这一对中排在后面的节点，也正好是下一对待交换节点的前驱，所以要把 temp 前移到 node1，以维持“temp 始终指向待交换那一对的前驱”这一循环不变量。",
    "wrongWhy": {
     "temp = node2;": "交换后 node2 排到这一对的前面、node1 排在后面。若 temp 指向 node2，下一轮 temp->next 就是已经交换好的 node1，会把 node1 和它后面的节点重新当作一对来交换，导致节点被重复处理、结果错乱。",
     "temp = temp->next;": "此时 temp->next 已在循环体第一行被赋值为 node2，所以这行代码等价于 temp = node2，会产生和上面相同的重复处理、结果错乱问题。"
    }
   }
  ]
 },
 {
  "id": 25,
  "title": "25. K 个一组翻转链表",
  "category": "链表",
  "difficulty": "hard",
  "descHtml": "<p>给你链表的头节点 <code>head</code> ，每&nbsp;<code>k</code><em>&nbsp;</em>个节点一组进行翻转，请你返回修改后的链表。</p>\n\n<p><code>k</code> 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是&nbsp;<code>k</code><em>&nbsp;</em>的整数倍，那么请将最后剩余的节点保持原有顺序。</p>\n\n<p>你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], k = 2\n<strong>输出：</strong>[2,1,4,3,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5], k = 3\n<strong>输出：</strong>[3,2,1,4,5]\n</pre>\n\n<p>&nbsp;</p>\n<strong>提示：</strong>\n\n<ul>\n\t<li>链表中的节点数目为 <code>n</code></li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以设计一个只用 <code>O(1)</code> 额外内存空间的算法解决此问题吗？</p>\n\n<ul>\n</ul>",
  "code": "class Solution {\npublic:\n    // 翻转一个子链表，并且返回新的头与尾\n    pair<ListNode*, ListNode*> myReverse(ListNode* head, ListNode* tail) {\n        ListNode* prev = tail->next;\n        ListNode* p = head;\n        while (prev != tail) {\n            ListNode* nex = p->next;\n            p->next = prev;\n            prev = p;\n            p = nex;\n        }\n        return {tail, head};\n    }\n\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        ListNode* hair = new ListNode(0);\n        hair->next = head;\n        ListNode* pre = hair;\n\n        while (head) {\n            ListNode* tail = pre;\n            // 查看剩余部分长度是否大于等于 k\n            for (int i = 0; i < k; ++i) {\n                tail = tail->next;\n                if (!tail) {\n                    return hair->next;\n                }\n            }\n            ListNode* nex = tail->next;\n            // 这里是 C++17 的写法，也可以写成\n            // pair<ListNode*, ListNode*> result = myReverse(head, tail);\n            // head = result.first;\n            // tail = result.second;\n            tie(head, tail) = myReverse(head, tail);\n            // 把子链表重新接回原链表\n            pre->next = head;\n            tail->next = nex;\n            pre = tail;\n            head = tail->next;\n        }\n\n        return hair->next;\n    }\n};",
  "cards": [
   {
    "id": "p25-reverse-loop-condition",
    "crux": "反转循环用 prev != tail（而非 p != tail）作为终止条件，因为 prev 比 p 慢一步",
    "answer": "while (prev != tail)",
    "blankOffset": 198,
    "blankLen": 20,
    "options": [
     "while (prev != tail)",
     "while (p != tail)",
     "while (p != nullptr)"
    ],
    "why": "prev 总是滞后 p 一步。只有当 p 处理完 tail 节点（把 tail->next 改成前驱）之后，prev 才会变成 tail，此时循环恰好该停。用 prev 判断能保证 tail 节点本身也被完整处理一遍。",
    "wrongWhy": {
     "while (p != tail)": "会在 p 走到 tail 之前就提前退出循环，导致 tail 节点（反转后变成新头 head）的 next 指针没有被改写为指向前一个节点，反转链表从第一个节点开始就是断的。",
     "while (p != nullptr)": "p 最终会走到 nex（组外节点），若 nex 非空循环不会停止，会继续把组外节点的 next 指针也改写，破坏组外链表结构，甚至可能一路遍历到链表末尾。"
    }
   },
   {
    "id": "p25-group-size-count",
    "crux": "用 for 循环走 k 步找 tail，边界必须是 i < k（走满 k 次），多一次或少一次都会分错组",
    "answer": "i < k",
    "blankOffset": 645,
    "blankLen": 5,
    "options": [
     "i < k",
     "i <= k",
     "i < k - 1"
    ],
    "why": "从 pre 开始需要恰好走 k 步才能到达这一组的第 k 个节点（组尾 tail）。i 从 0 到 k-1 循环 k 次，每次 tail = tail->next，正好走 k 步。",
    "wrongWhy": {
     "i <= k": "会多走一步，让 tail 指向第 k+1 个节点，实际反转区间比一组多包含了一个节点，分组边界和后续拼接全部错位。",
     "i < k - 1": "只走 k-1 步，tail 停在第 k-1 个节点上，等于把只有 k-1 个节点的区间当成完整一组来反转和拼接，会漏掉一个节点或把它错误处理。"
    }
   },
   {
    "id": "p25-group-remainder-null-check",
    "crux": "每走一步都立刻检查 !tail（而非提前检查 !tail->next），不足 k 个时才能及时终止并保持原序",
    "answer": "!tail",
    "blankOffset": 714,
    "blankLen": 5,
    "options": [
     "!tail",
     "!tail->next",
     "i == k - 1 && !tail"
    ],
    "why": "每走一步就检查当前 tail 是否已经为空：一旦不足 k 个节点，立刻返回 hair->next，保留剩余部分不反转；同时避免下一轮对空指针取 next 而崩溃。",
    "wrongWhy": {
     "!tail->next": "提前判断下一个节点是否存在，会把“恰好剩下 k 个节点、tail 就是最后一个节点”的合法情况误判为不足 k 个，导致本该完整反转的最后一组被错误地跳过。",
     "i == k - 1 && !tail": "只在最后一次循环时才检查空指针，如果 tail 在中间某一步就提前变成 nullptr，不会被及时发现，下一轮 tail = tail->next 会对空指针取 next 而崩溃。"
    }
   }
  ]
 },
 {
  "id": 31,
  "title": "31. 下一个排列",
  "category": "技巧",
  "difficulty": "medium",
  "descHtml": "<p>整数数组的一个 <strong>排列</strong>&nbsp; 就是将其所有成员以序列或线性顺序排列。</p>\n\n<ul>\n\t<li>例如，<code>arr = [1,2,3]</code> ，以下这些都可以视作 <code>arr</code> 的排列：<code>[1,2,3]</code>、<code>[1,3,2]</code>、<code>[3,1,2]</code>、<code>[2,3,1]</code> 。</li>\n</ul>\n\n<p>整数数组的 <strong>下一个排列</strong> 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 <strong>下一个排列</strong> 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。</p>\n\n<ul>\n\t<li>例如，<code>arr = [1,2,3]</code> 的下一个排列是 <code>[1,3,2]</code> 。</li>\n\t<li>类似地，<code>arr = [2,3,1]</code> 的下一个排列是 <code>[3,1,2]</code> 。</li>\n\t<li>而 <code>arr = [3,2,1]</code> 的下一个排列是 <code>[1,2,3]</code> ，因为 <code>[3,2,1]</code> 不存在一个字典序更大的排列。</li>\n</ul>\n\n<p>给你一个整数数组 <code>nums</code> ，找出 <code>nums</code> 的下一个排列。</p>\n\n<p>必须<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\"> 原地 </a></strong>修改，只允许使用额外常数空间。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[1,3,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,1]\n<strong>输出：</strong>[1,2,3]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,1,5]\n<strong>输出：</strong>[1,5,1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 100</code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        int i = nums.size() - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) { // 从后往前找第一个升序对 nums[i] < nums[i+1]\n            i--;\n        }\n        if (i >= 0) {\n            int j = nums.size() - 1;\n            while (j >= 0 && nums[i] >= nums[j]) { // 在降序后缀里找第一个比 nums[i] 大的数\n                j--;\n            }\n            swap(nums[i], nums[j]);\n        }\n        reverse(nums.begin() + i + 1, nums.end()); // 降序后缀反转成升序，保证增量最小\n    }\n};",
  "cards": [
   {
    "id": "p31-i-init-size-minus-2",
    "crux": "起始下标 i 必须是 size()-2，才能保证 nums[i+1] 不越界",
    "answer": "nums.size() - 2",
    "blankOffset": 87,
    "blankLen": 15,
    "options": [
     "nums.size() - 2",
     "nums.size() - 1",
     "nums.size()",
     "0"
    ],
    "why": "算法要从后往前比较相邻两个数 nums[i] 和 nums[i+1]，i 的最大取值只能是倒数第二个下标，这样 i+1 恰好指向最后一个元素，不会越界。",
    "wrongWhy": {
     "0": "从头开始扫描，方向和语义都反了，无法找到「从后往前的第一个升序对」。",
     "nums.size() - 1": "此时 i+1 == nums.size()，访问 nums[i+1] 直接越界，是未定义行为。",
     "nums.size()": "越界更严重，i 本身就已经指向数组外，nums[i] 就会崩溃。"
    }
   },
   {
    "id": "p31-first-while-nonstrict-continue",
    "crux": "第一个 while 的继续条件必须用 >=，靠相等也继续左移才能保证找到的是严格升序对",
    "answer": "nums[i] >= nums[i + 1]",
    "blankOffset": 129,
    "blankLen": 22,
    "options": [
     "nums[i] >= nums[i + 1]",
     "nums[i] > nums[i + 1]",
     "nums[i] <= nums[i + 1]",
     "nums[i] < nums[i + 1]"
    ],
    "why": "题解要求找的是严格升序对 nums[i] < nums[i+1]，所以只要不满足这个严格小于（即 nums[i] >= nums[i+1]）就应继续左移，这样循环退出时一定是找到了严格升序对或者 i<0。",
    "wrongWhy": {
     "nums[i] > nums[i + 1]": "遇到 nums[i] == nums[i+1]（相等，不是升序对）时会提前停止循环，把相等误判成升序对，后续交换位置和结果都会出错。",
     "nums[i] <= nums[i + 1]": "真正找到升序对（nums[i] < nums[i+1]）时反而会继续左移，跳过正确的 i，导致后面处理更早的、不该动的位置。",
     "nums[i] < nums[i + 1]": "条件方向完全反了：找到升序对时循环反而继续执行 i--，等于把「停止条件」和「继续条件」搞反，逻辑彻底错乱。"
    }
   },
   {
    "id": "p31-if-i-boundary-check",
    "crux": "判断是否找到升序对要用 i >= 0，不能漏掉 i == 0 这一合法情况",
    "answer": "i >= 0",
    "blankOffset": 229,
    "blankLen": 6,
    "options": [
     "i >= 0",
     "i > 0",
     "i >= 1",
     "i < 0"
    ],
    "why": "循环退出时 i 要么是 -1（整体降序，没找到），要么是某个 >=0 的合法下标（找到了升序对），包括 i==0 的情况（例如 nums[0] < nums[1]），所以判断条件必须包含 0。",
    "wrongWhy": {
     "i > 0": "把 i==0 的合法升序对排除在外，本该做交换的情况被跳过，直接进入反转分支，得到错误的排列。",
     "i >= 1": "同样错误地排除 i==0，导致 nums[0] 与后缀首个更大数的交换被漏掉。",
     "i < 0": "条件正好写反，把「没找到」当成「找到」处理，交换和反转的分支完全用错。"
    }
   },
   {
    "id": "p31-j-init-size-minus-1",
    "crux": "第二个指针 j 必须从 size()-1（最后一个下标）开始，才能覆盖整个降序后缀",
    "answer": "nums.size() - 1",
    "blankOffset": 259,
    "blankLen": 15,
    "options": [
     "nums.size() - 1",
     "nums.size() - 2",
     "i + 1",
     "nums.size()"
    ],
    "why": "需要在 i 右边整个降序后缀里，从最右侧开始往左找第一个比 nums[i] 大的数，所以 j 必须从数组最后一个合法下标开始。",
    "wrongWhy": {
     "nums.size() - 2": "漏扫了最后一个元素，如果恰好是它才是应该与 nums[i] 交换的最优候选，就会被跳过，换到错误的数。",
     "i + 1": "把起点放到后缀最左端，方向与题解「从后往前找」相悖，无法保证找到的是最右侧、增量最小的那个数。",
     "nums.size()": "越界访问 nums[size]，属于未定义行为。"
    }
   },
   {
    "id": "p31-second-while-nonstrict-continue",
    "crux": "第二个 while 的继续条件也要用 >=，只有严格大于 nums[i] 才停止",
    "answer": "nums[i] >= nums[j]",
    "blankOffset": 305,
    "blankLen": 18,
    "options": [
     "nums[i] >= nums[j]",
     "nums[i] > nums[j]",
     "nums[i] <= nums[j]",
     "nums[i] < nums[j]"
    ],
    "why": "题解要找的是「第一个比 nums[i] 大」的数，即严格 nums[j] > nums[i]；只要不满足这个条件（即 nums[i] >= nums[j]）就该继续左移，这样才能保证停下来的位置严格大于 nums[i]。",
    "wrongWhy": {
     "nums[i] > nums[j]": "当 nums[i] == nums[j] 时会提前停止（相等不满足「大于」的要求），交换后得到的排列不一定比原排列大，破坏「下一个排列」的正确性。",
     "nums[i] <= nums[j]": "真正找到 nums[j] > nums[i] 时反而继续左移，跳过最右侧的最优候选，导致交换到偏左、增量偏大的错误位置。",
     "nums[i] < nums[j]": "条件方向反了，找到目标时循环继续执行 j--，逻辑与预期完全相反。"
    }
   },
   {
    "id": "p31-reverse-range-start-i-plus-1",
    "crux": "反转区间起点必须是 i+1，不能包含刚被交换过的 nums[i]",
    "answer": "i + 1",
    "blankOffset": 466,
    "blankLen": 5,
    "options": [
     "i + 1",
     "i",
     "i + 2",
     "i - 1"
    ],
    "why": "nums[i] 已经被换成了后缀中恰好更大的那个数，它不属于需要反转的降序后缀，只有 i 右边（从 i+1 开始）的部分才是仍然降序、需要整体反转为升序的区间。",
    "wrongWhy": {
     "i": "把刚换好的 nums[i] 也纳入反转范围，会打乱这个刚确定好的最优数字位置，得到的排列不是正确的下一个排列。",
     "i + 2": "少反转了紧邻 i 的一个元素，后缀不能被完全整理成升序，结果仍然存在局部降序，增量不是最小的。",
     "i - 1": "把 i 前面本不该变动的前缀元素也纳入反转范围，破坏了不该改变的部分，结果完全错误。"
    }
   }
  ]
 },
 {
  "id": 32,
  "title": "32. 最长有效括号",
  "category": "动态规划",
  "difficulty": "hard",
  "descHtml": "<p>给你一个只包含 <code>'('</code> 和 <code>')'</code> 的字符串，找出最长有效（格式正确且连续）括号 <span data-keyword=\"substring\">子串</span> 的长度。</p>\n\n<p>左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如&nbsp;<code>\"(()())\"</code>。</p>\n\n<p>&nbsp;</p>\n\n<div class=\"original__bRMd\">\n<div>\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"(()\"\n<strong>输出：</strong>2\n<strong>解释：</strong>最长有效括号子串是 \"()\"\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \")()())\"\n<strong>输出：</strong>4\n<strong>解释：</strong>最长有效括号子串是 \"()()\"\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"\"\n<strong>输出：</strong>0\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s[i]</code> 为 <code>'('</code> 或 <code>')'</code></li>\n</ul>\n</div>\n</div>",
  "code": "class Solution {\npublic:\n    int longestValidParentheses(string s) {\n        int maxans = 0, n = s.length();\n        vector<int> dp(n, 0);\n        for (int i = 1; i < n; i++) {\n            if (s[i] == ')') {\n                if (s[i - 1] == '(') {\n                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2; // 情况 \"...()\"\n                } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {\n                    dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2; // 情况 \"...))\"：跨过内层有效段 dp[i-1] 找配对的 '('\n                }\n                maxans = max(maxans, dp[i]);\n            }\n        }\n        return maxans;\n    }\n};",
  "cards": [
   {
    "id": "p32-loop-start-from-1",
    "crux": "遍历下标必须从 1 开始，不能从 0 开始，也不能跳过 1",
    "answer": "i = 1",
    "blankOffset": 156,
    "blankLen": 5,
    "options": [
     "i = 1",
     "i = 0",
     "i = 2"
    ],
    "why": "dp[i] 只在 s[i]==')' 时可能非零，且计算时会访问 s[i-1]（判断是否为'('）。i 若从 0 开始，s[i-1] 会变成 s[-1] 越界访问；而 dp 数组本身长度就是 n，从下标 1 起遍历既能保证 s[i-1] 合法，又不会漏掉任何可能的 ')' 位置（i=0 处若是 ')' 前面也没有字符可配对，天然 dp[0]=0，不需要处理）。",
    "wrongWhy": {
     "i = 0": "当 i=0 时会执行 s[i-1] 即 s[-1]，数组越界读取，属于未定义行为，可能读到脏值导致后续判断和结果都错误。",
     "i = 2": "会直接跳过 i=1 这个位置的判断。例如 s=\"()\" 长度为2，循环条件 i<2 时 i=2 已不满足，整个循环体从未执行，maxans 恒为 0，而正确答案应是 2，属于漏判。"
    }
   },
   {
    "id": "p32-case-open-paren-before-boundary",
    "crux": "情况“...()”中，只有 i>=2 才能安全访问 dp[i-2]，否则应按 0 处理",
    "answer": "i >= 2",
    "blankOffset": 276,
    "blankLen": 6,
    "options": [
     "i >= 2",
     "i >= 1"
    ],
    "why": "dp[i-2] 合法需要 i-2>=0，即 i>=2。最小情况是 i=1（比如 s=\"()\"），此时前面没有任何字符，跨过去的 dp[i-2] 应视为不存在，取 0，直接加 2 即为该段长度。",
    "wrongWhy": {
     "i >= 1": "当 i=1 时该判断为真，会去访问 dp[i-2]=dp[-1]，数组越界（未定义行为），可能读到脏数据导致 dp 值和最终答案错误。"
    }
   },
   {
    "id": "p32-case-close-paren-cross-boundary-index",
    "crux": "情况“...))”中，必须先保证 i-dp[i-1] 严格大于 0，才能去访问 s[i-dp[i-1]-1]，否则会越界",
    "answer": "i - dp[i - 1] > 0",
    "blankOffset": 346,
    "blankLen": 17,
    "options": [
     "i - dp[i - 1] > 0",
     "i - dp[i - 1] >= 0",
     "i - dp[i - 1] > 1"
    ],
    "why": "要访问 s[i - dp[i-1] - 1]，必须保证这个下标 >= 0，即 i - dp[i-1] - 1 >= 0，也就是 i - dp[i-1] >= 1，在整数范围内等价于 i - dp[i-1] > 0。这一步是为了排除“跨过内层有效段后前面已经没有字符”的情况。",
    "wrongWhy": {
     "i - dp[i - 1] >= 0": "当 i - dp[i-1] == 0 时该判断也会为真，随后访问 s[i-dp[i-1]-1] = s[-1]，数组越界读取，属于未定义行为。",
     "i - dp[i - 1] > 1": "会漏掉 i - dp[i-1] == 1 的合法情况。例如 s=\"(())\"，计算到 i=3 时 dp[2]=2，i-dp[i-1]=3-2=1，正确条件下 1>0 成立，能找到 s[0]='(' 配对，得到 dp[3]=4；但若条件写成 >1，1>1 为假，该分支被跳过，dp[3] 停在 0，最终 maxans 会从正确的 4 退化为 2，属于漏判。"
    }
   },
   {
    "id": "p32-case-close-paren-nested-dp-boundary",
    "crux": "情况“...))”中，跨过配对括号后还要判断 i-dp[i-1]>=2 才能安全访问更前面的 dp[i-dp[i-1]-2]",
    "answer": "(i - dp[i - 1]) >= 2",
    "blankOffset": 439,
    "blankLen": 20,
    "options": [
     "(i - dp[i - 1]) >= 2",
     "(i - dp[i - 1]) >= 1"
    ],
    "why": "要访问 dp[i - dp[i-1] - 2]，必须保证该下标 >= 0，即 i - dp[i-1] - 2 >= 0，也就是 i - dp[i-1] >= 2；不满足时说明再往前已经没有可累加的有效段，应按 0 处理。",
    "wrongWhy": {
     "(i - dp[i - 1]) >= 1": "当 i - dp[i-1] == 1 时该判断也会为真，随后访问 dp[i-dp[i-1]-2] = dp[-1]，数组越界读取，属于未定义行为，会污染 dp[i] 的计算结果。"
    }
   }
  ]
 },
 {
  "id": 33,
  "title": "33. 搜索旋转排序数组",
  "category": "二分查找",
  "difficulty": "medium",
  "descHtml": "<p>整数数组 <code>nums</code> 按升序排列，数组中的值 <strong>互不相同</strong> 。</p>\n\n<p>在传递给函数之前，<code>nums</code> 在预先未知的某个下标 <code>k</code>（<code>0 &lt;= k &lt; nums.length</code>）上进行了 <strong>向左旋转</strong>，使数组变为 <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code>（下标 <strong>从 0 开始</strong> 计数）。例如， <code>[0,1,2,4,5,6,7]</code> 下标&nbsp;<code>3</code>&nbsp;上向左旋转后可能变为&nbsp;<code>[4,5,6,7,0,1,2]</code> 。</p>\n\n<p>给你 <strong>旋转后</strong> 的数组 <code>nums</code> 和一个整数 <code>target</code> ，如果 <code>nums</code> 中存在这个目标值 <code>target</code> ，则返回它的下标，否则返回&nbsp;<code>-1</code>&nbsp;。</p>\n\n<p>你必须设计一个时间复杂度为 <code>O(log n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2], target = 0\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2], target = 3\n<strong>输出：</strong>-1</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1], target = 0\n<strong>输出：</strong>-1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 5000</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 中的每个值都 <strong>独一无二</strong></li>\n\t<li>题目数据保证 <code>nums</code> 在预先未知的某个下标上进行了旋转</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int n = (int)nums.size();\n        if (!n) {\n            return -1;\n        }\n        if (n == 1) {\n            return nums[0] == target ? 0 : -1;\n        }\n        int l = 0, r = n - 1;\n        while (l <= r) {\n            int mid = (l + r) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[0] <= nums[mid]) { // 左半 [0, mid] 有序\n                if (nums[0] <= target && target < nums[mid]) {\n                    r = mid - 1;\n                } else {\n                    l = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[n - 1]) {\n                    l = mid + 1;\n                } else {\n                    r = mid - 1;\n                }\n            }\n        }\n        return -1;\n    }\n};",
  "cards": [
   {
    "id": "p33-while-loop-closed-interval-boundary",
    "crux": "二分循环条件 l <= r 还是 l < r",
    "answer": "l <= r",
    "blankOffset": 282,
    "blankLen": 6,
    "options": [
     "l <= r",
     "l < r"
    ],
    "why": "l、r 维护的是闭区间 [l, r]，当 l==r 时区间里还剩最后一个候选元素，必须进入循环检查它，所以要用 <=。",
    "wrongWhy": {
     "l < r": "l==r 时会提前退出循环，漏掉对最后一个候选元素 nums[l] 的判断，可能导致 target 恰好是它时也返回 -1。"
    }
   },
   {
    "id": "p33-left-sorted-check-equality",
    "crux": "判断左半是否有序时 nums[0] 与 nums[mid] 的比较要不要带等号",
    "answer": "nums[0] <= nums[mid]",
    "blankOffset": 392,
    "blankLen": 20,
    "options": [
     "nums[0] <= nums[mid]",
     "nums[0] < nums[mid]"
    ],
    "why": "当左半区间 [0, mid] 只有一个元素时（例如 l 与 mid 相等），nums[0] 恰好等于 nums[mid]，此时左半依然是（平凡）有序的，必须用 <= 才能正确判定为有序，否则会误入右半分支的逻辑。",
    "wrongWhy": {
     "nums[0] < nums[mid]": "当 nums[0] == nums[mid]（如左半只剩单元素）时会被误判为「左半非有序」，从而走进右半有序的分支逻辑，用错误的区间判断条件收缩边界。"
    }
   },
   {
    "id": "p33-left-sorted-lower-bound-equality",
    "crux": "左半有序时判断 target 是否落在区间内，nums[0] 一侧的等号不能丢",
    "answer": "nums[0] <= target",
    "blankOffset": 454,
    "blankLen": 17,
    "options": [
     "nums[0] <= target",
     "nums[0] < target"
    ],
    "why": "左半是闭区间 [0, mid]，nums[0] 本身就是有效候选值，判断 target 是否落在这个区间必须用 <=，否则 target 恰好等于 nums[0] 时会被误判为不在左半范围内。",
    "wrongWhy": {
     "nums[0] < target": "target == nums[0] 时会被误判为不在左半区间内，转而执行 l = mid + 1 跳过左侧，导致本应命中的 target 被漏掉，最终返回 -1。"
    }
   },
   {
    "id": "p33-right-sorted-upper-bound-equality",
    "crux": "右半有序时判断 target 是否落在区间内，nums[n-1] 一侧的等号不能丢",
    "answer": "target <= nums[n - 1]",
    "blankOffset": 669,
    "blankLen": 21,
    "options": [
     "target <= nums[n - 1]",
     "target < nums[n - 1]"
    ],
    "why": "右半是闭区间 [mid, n-1]，nums[n-1] 本身是有效候选值，判断 target 是否落在这个区间必须用 <=，否则 target 恰好等于最后一个元素时会被误判为不在右半范围内。",
    "wrongWhy": {
     "target < nums[n - 1]": "target == nums[n-1] 时会被误判为不在右半区间内，转而执行 r = mid - 1 向左收缩，跳过了实际存在于右侧的目标，最终返回 -1。"
    }
   }
  ]
 },
 {
  "id": 34,
  "title": "34. 在排序数组中查找元素的第一个和最后一个位置",
  "category": "二分查找",
  "difficulty": "medium",
  "descHtml": "<p>给你一个按照非递减顺序排列的整数数组 <code>nums</code>，和一个目标值 <code>target</code>。请你找出给定目标值在数组中的开始位置和结束位置。</p>\n\n<p>如果数组中不存在目标值 <code>target</code>，返回&nbsp;<code>[-1, -1]</code>。</p>\n\n<p>你必须设计并实现时间复杂度为&nbsp;<code>O(log n)</code>&nbsp;的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 8\n<strong>输出：</strong>[3,4]</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 6\n<strong>输出：</strong>[-1,-1]</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [], target = 0\n<strong>输出：</strong>[-1,-1]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= nums[i]&nbsp;&lt;= 10<sup>9</sup></code></li>\n\t<li><code>nums</code>&nbsp;是一个非递减数组</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target&nbsp;&lt;= 10<sup>9</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int binarySearch(vector<int>& nums, int target, bool lower) {\n        int left = 0, right = (int)nums.size() - 1, ans = (int)nums.size();\n        while (left <= right) {\n            int mid = (left + right) / 2;\n            if (nums[mid] > target || (lower && nums[mid] >= target)) { // lower=true 找第一个 >= target，否则找第一个 > target\n                right = mid - 1;\n                ans = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return ans;\n    }\n\n    vector<int> searchRange(vector<int>& nums, int target) {\n        int leftIdx = binarySearch(nums, target, true);\n        int rightIdx = binarySearch(nums, target, false) - 1;\n        if (leftIdx <= rightIdx && rightIdx < nums.size() && nums[leftIdx] == target && nums[rightIdx] == target) {\n            return vector<int>{leftIdx, rightIdx};\n        }\n        return vector<int>{-1, -1};\n    }\n};",
  "cards": [
   {
    "id": "p34-binary-search-while-loop-bound",
    "crux": "二分查找主循环条件必须是 left <= right（闭区间收缩需覆盖 left==right 的情形）",
    "answer": "left <= right",
    "blankOffset": 182,
    "blankLen": 13,
    "options": [
     "left <= right",
     "left < right"
    ],
    "why": "题解用的是左闭右闭区间 [left, right]，只要 left <= right 说明区间内还有未判断的下标（包括 left==right 这个单元素区间），必须继续二分，否则会漏掉对最后一个候选下标的判断。",
    "wrongWhy": {
     "left < right": "会在 left==right 时提前退出循环，导致区间只剩一个元素时不再被检查，若这个元素恰好是要找的边界（如恰好等于 target），ans 就不会被更新为它，最终返回错误的边界下标。"
    }
   },
   {
    "id": "p34-binary-search-ans-sentinel",
    "crux": "ans 的初始值须设为 nums.size()，即谓词在区间内无一满足时的插入点（越过末尾），才能保证 target 恰为最大元素时右边界计算正确",
    "answer": "(int)nums.size()",
    "blankOffset": 149,
    "blankLen": 16,
    "options": [
     "(int)nums.size()",
     "-1",
     "0"
    ],
    "why": "binarySearch 返回的是谓词第一次成立的下标（插入点）。当区间内没有任何元素满足谓词时，if 分支永远不执行，ans 保持初值。关键场景是 binarySearch(nums,target,false) 找“第一个 > target 的下标”：当 target 恰好等于数组中的最大元素时，不存在比它更大的元素，此时应返回 nums.size() 表示插入点在末尾之后，这样 rightIdx = binarySearch(false)-1 = nums.size()-1 才正好落在最后一个 target 上；若初值偏小，rightIdx 会算错，leftIdx<=rightIdx 校验会误判为不存在。",
    "wrongWhy": {
     "0": "初值设为 0 同样会在 target 为最大元素时让 binarySearch(false) 返回 0 而非 nums.size()，导致 rightIdx = -1、leftIdx<=rightIdx 为假，把实际存在的区间误判成 [-1,-1]（是漏报，而不是在下标 0 处误报）。",
     "-1": "初值设为 -1 时，若 target 恰是数组中最大的元素，binarySearch(false) 找不到更大的元素便返回 -1（而非 nums.size()），于是 rightIdx = -1-1 = -2；随后 leftIdx <= rightIdx 判断为假，searchRange 会对本应存在的 target 错误地返回 [-1,-1]。"
    }
   },
   {
    "id": "p34-binary-search-right-shrink-mid-minus-1",
    "crux": "命中条件后收缩右边界必须是 right = mid - 1，排除掉已经判断过的 mid",
    "answer": "mid - 1",
    "blankOffset": 382,
    "blankLen": 7,
    "options": [
     "mid - 1",
     "mid",
     "mid + 1"
    ],
    "why": "此时 mid 已经满足“候选边界”的条件并被记录进 ans，继续二分是为了在左半区间寻找是否存在更靠左（更小）的候选下标，所以要把 mid 排除出下一轮区间，写成 right = mid - 1。",
    "wrongWhy": {
     "mid": "不排除 mid 本身，当 left==right==mid 时 right 不会变化，循环条件 left<=right 恒成立而区间不再收缩，造成死循环。",
     "mid + 1": "right = mid + 1 让右边界不减反增（始终 >= mid），根本没有缩小区间；if 分支反复命中时 left、right 都不再向内收敛，区间恒不为空，造成死循环、无法定位边界。"
    }
   },
   {
    "id": "p34-binary-search-left-shrink-mid-plus-1",
    "crux": "不满足条件时左边界收缩必须是 left = mid + 1，排除掉已经判断过的 mid",
    "answer": "mid + 1",
    "blankOffset": 462,
    "blankLen": 7,
    "options": [
     "mid + 1",
     "mid",
     "mid - 1"
    ],
    "why": "mid 处的值不满足边界条件，说明答案一定在 mid 右侧，需要把 mid 从下一轮区间中排除，写成 left = mid + 1，才能保证区间持续收缩直到定位到正确边界或区间为空。",
    "wrongWhy": {
     "mid": "不排除已经判断过且不满足条件的 mid，当 left==right==mid 时 left 不会变化，导致死循环。",
     "mid - 1": "left = mid - 1 让左边界不增反减，把已经确认不满足条件的左半区间重新纳入，区间不向内收缩、无法收敛，造成死循环。"
    }
   },
   {
    "id": "p34-right-idx-minus-one-adjustment",
    "crux": "右边界下标必须在“第一个 > target 的下标”基础上再减 1，才是真正的最后一个 == target 的下标",
    "answer": "- 1",
    "blankOffset": 696,
    "blankLen": 3,
    "options": [
     "- 1",
     "+ 1"
    ],
    "why": "binarySearch(nums, target, false) 返回的是第一个严格大于 target 的下标，这个下标本身指向的是比 target 大的元素（或越界），把它减 1 才能回退到最后一个等于 target 的元素位置。",
    "wrongWhy": {
     "+ 1": "会在“第一个大于 target 的下标”基础上再往右多跳一位，得到的 rightIdx 对应的元素几乎不可能等于 target，甚至可能超出数组范围，导致最终结果被误判为 [-1,-1] 或访问越界。"
    }
   },
   {
    "id": "p34-left-right-idx-bound-check-le",
    "crux": "校验左右边界合法性时必须用 leftIdx <= rightIdx（而非严格小于），否则会漏掉只出现一次的情形",
    "answer": "leftIdx <= rightIdx",
    "blankOffset": 713,
    "blankLen": 19,
    "options": [
     "leftIdx <= rightIdx",
     "leftIdx < rightIdx"
    ],
    "why": "当 target 在数组中只出现一次时，第一个位置和最后一个位置是同一个下标，即 leftIdx==rightIdx，必须用 <= 才能让这种合法情形通过校验；同时该判断在 && 短路求值中排在最前面，也保证了 leftIdx 越界（如未找到时等于 nums.size()）时不会去访问 nums[leftIdx]。",
    "wrongWhy": {
     "leftIdx < rightIdx": "当 target 只出现一次、leftIdx 与 rightIdx 相等时条件为假，本该返回该下标的合法情况会被误判为不存在，从而错误地返回 [-1,-1]。"
    }
   }
  ]
 },
 {
  "id": 35,
  "title": "35. 搜索插入位置",
  "category": "二分查找",
  "difficulty": "easy",
  "descHtml": "<p>给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。</p>\n\n<p>请必须使用时间复杂度为 <code>O(log n)</code> 的算法。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 5\n<strong>输出:</strong> 2\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 2\n<strong>输出:</strong> 1\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,3,5,6], target = 7\n<strong>输出:</strong> 4\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 为&nbsp;<strong>无重复元素&nbsp;</strong>的&nbsp;<strong>升序&nbsp;</strong>排列数组</li>\n\t<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        int n = nums.size();\n        int left = 0, right = n - 1, ans = n; // ans 初值 n：全部元素都小于 target 时插在末尾\n        while (left <= right) {\n            int mid = ((right - left) >> 1) + left;\n            if (target <= nums[mid]) { // 找第一个 >= target 的位置：满足就记下并继续向左\n                ans = mid;\n                right = mid - 1;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p35-ans-init-n",
    "crux": "ans 初值必须设为 n，表示所有元素都比 target 小时插入到末尾",
    "answer": "n",
    "blankOffset": 151,
    "blankLen": 1,
    "options": [
     "n",
     "n - 1",
     "0",
     "-1"
    ],
    "why": "solutionText 明确说明 ans 初值为 n，因为若数组内所有元素都小于 target，插入位置就在数组末尾（下标 n）；这个初值同时兜底了循环一次都不进入更新的情况。",
    "wrongWhy": {
     "0": "把兜底答案错误设为最前面，若 target 比所有元素都大，会返回错误的 0 而非应有的末尾插入位置。",
     "n - 1": "会导致 target 大于所有元素时返回的插入位置少 1，实际应插在下标 n 处而非 n-1。",
     "-1": "-1 不是合法的插入下标，且没有语义支撑，属于臆造的错误初值。"
    }
   },
   {
    "id": "p35-right-init-n-minus-1",
    "crux": "right 初值必须是 n - 1，构成闭区间 [left, right]",
    "answer": "n - 1",
    "blankOffset": 138,
    "blankLen": 5,
    "options": [
     "n - 1",
     "n",
     "n + 1"
    ],
    "why": "hints 指出这是闭区间 [left, right] 上的二分，right 必须指向数组最后一个合法下标 n-1，配合循环条件 left <= right 才能正确遍历闭区间。",
    "wrongWhy": {
     "n": "right 设为 n 会导致 nums[mid] 在 mid=n 时越界访问，超出数组范围。",
     "n + 1": "进一步扩大越界范围，nums[mid] 访问会更严重地越界，程序行为未定义。"
    }
   },
   {
    "id": "p35-while-condition-le",
    "crux": "闭区间二分的循环条件必须是 left <= right（含等号）",
    "answer": "left <= right",
    "blankOffset": 202,
    "blankLen": 13,
    "options": [
     "left <= right",
     "left < right",
     "left != right"
    ],
    "why": "hints 明确指出闭区间 [left, right] 上二分，循环条件必须是 left <= right，这样当 left == right 时区间里还有一个元素需要判断，若漏掉等号会漏判最后一个元素。",
    "wrongWhy": {
     "left < right": "闭区间下 left == right 时区间内还剩一个元素未被检查就退出循环，可能导致 ans 未及时更新为正确下标。",
     "left != right": "由于 right 会在某些分支被设为 mid - 1，可能出现 left 越过 right（left > right）却不等于的情况被跳过或死循环风险，逻辑不等价于闭区间终止条件。"
    }
   },
   {
    "id": "p35-target-le-nums-mid",
    "crux": "判断条件必须带等号 target <= nums[mid]，才能在 target 存在时记录到其真实下标",
    "answer": "target <= nums[mid]",
    "blankOffset": 287,
    "blankLen": 19,
    "options": [
     "target <= nums[mid]",
     "target < nums[mid]",
     "target >= nums[mid]"
    ],
    "why": "solutionText 强调易错点是判断必须带等号：要找的是第一个 >= target 的下标，当 nums[mid] 恰好等于 target 时也要记为候选答案并继续向左收缩，否则找到的会是第一个严格大于 target 的位置，导致目标存在时返回的下标偏右或找不到准确匹配。",
    "wrongWhy": {
     "target < nums[mid]": "去掉等号后，当 nums[mid] == target 时不会记录 ans 也不会继续向左收缩，会跳过命中该元素的最左位置，返回错误的下标。",
     "target >= nums[mid]": "方向反了，会把收缩方向和 ans 更新逻辑用反，变成寻找最后一个 <= target 的位置，语义完全不同，插入位置计算错误。"
    }
   },
   {
    "id": "p35-shrink-right-mid-minus-1",
    "crux": "命中候选后必须收缩为 right = mid - 1，继续向左找更小的候选下标",
    "answer": "mid - 1",
    "blankOffset": 394,
    "blankLen": 7,
    "options": [
     "mid - 1",
     "mid",
     "mid + 1"
    ],
    "why": "hints 指出记 ans = mid 后要 right = mid - 1 继续向左收缩，因为要找的是第一个满足条件的最左下标，mid 已经记录为候选答案，不需要再检查，只需在其左侧继续寻找是否有更小的满足条件的下标。",
    "wrongWhy": {
     "mid": "right 不收缩会导致 mid 一直包含在区间内，可能造成死循环，且不会继续向左搜索更靠左的候选。",
     "mid + 1": "会把区间收缩到 mid 右侧，与代码语义相反（应向左找更小候选），导致最终得到的不是第一个满足条件的下标。"
    }
   }
  ]
 },
 {
  "id": 39,
  "title": "39. 组合总和",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给你一个 <strong>无重复元素</strong> 的整数数组&nbsp;<code>candidates</code> 和一个目标整数&nbsp;<code>target</code>&nbsp;，找出&nbsp;<code>candidates</code>&nbsp;中可以使数字和为目标数&nbsp;<code>target</code> 的 所有<em>&nbsp;</em><strong>不同组合</strong> ，并以列表形式返回。你可以按 <strong>任意顺序</strong> 返回这些组合。</p>\n\n<p><code>candidates</code> 中的 <strong>同一个</strong> 数字可以 <strong>无限制重复被选取</strong> 。如果至少一个数字的被选数量不同，则两种组合是不同的。&nbsp;</p>\n\n<p>对于给定的输入，保证和为&nbsp;<code>target</code> 的不同组合数少于 <code>150</code> 个。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>candidates = [2,3,6,7], target = 7\n<strong>输出：</strong>[[2,2,3],[7]]\n<strong>解释：</strong>\n2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。\n7 也是一个候选， 7 = 7 。\n仅有这两种组合。</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入: </strong>candidates = [2,3,5], target = 8\n<strong>输出: </strong>[[2,2,2,2],[2,3,3],[3,5]]</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入: </strong>candidates = [2], target = 1\n<strong>输出: </strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= candidates.length &lt;= 30</code></li>\n\t<li><code>2 &lt;= candidates[i] &lt;= 40</code></li>\n\t<li><code>candidates</code> 的所有元素 <strong>互不相同</strong></li>\n\t<li><code>1 &lt;= target &lt;= 40</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    void dfs(vector<int>& candidates, int target, vector<vector<int>>& ans, vector<int>& combine, int idx) {\n        if (idx == candidates.size()) {\n            return;\n        }\n        if (target == 0) {\n            ans.emplace_back(combine);\n            return;\n        }\n        // 直接跳过\n        dfs(candidates, target, ans, combine, idx + 1);\n        // 选择当前数\n        if (target - candidates[idx] >= 0) {\n            combine.emplace_back(candidates[idx]);\n            dfs(candidates, target - candidates[idx], ans, combine, idx);\n            combine.pop_back();\n        }\n    }\n\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        vector<vector<int>> ans;\n        vector<int> combine;\n        dfs(candidates, target, ans, combine, 0);\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p39-idx-out-of-bound-base-case",
    "crux": "idx 越界终止条件",
    "answer": "idx == candidates.size()",
    "blankOffset": 146,
    "blankLen": 24,
    "options": [
     "idx == candidates.size()",
     "idx > candidates.size()",
     "idx >= candidates.size() + 1",
     "idx == candidates.size() - 1"
    ],
    "why": "idx 每层递归至多加 1,永远不会跳过 size 直接超过它,所以用 == 就足以捕获到达末尾的时刻,是递归树上唯一会被真正触发的终止条件。",
    "wrongWhy": {
     "idx > candidates.size()": "idx 绝不会大于 size(它最多恰好等于 size),该条件永远为假,终止逻辑失效,后续 dfs 里访问 candidates[idx] 会越界。",
     "idx >= candidates.size() + 1": "阈值设置过大,同样永远不会触发,递归会继续访问越界的 candidates[idx]。",
     "idx == candidates.size() - 1": "提前一层终止,漏掉最后一个下标(size-1)的跳过/选择分支,导致搜索不完整、漏解。"
    }
   },
   {
    "id": "p39-skip-branch-idx-advance",
    "crux": "跳过分支必须推进 idx",
    "answer": "idx + 1",
    "blankOffset": 362,
    "blankLen": 7,
    "options": [
     "idx + 1",
     "idx",
     "idx - 1",
     "idx + 2"
    ],
    "why": "跳过当前数意味着以后都不再考虑这个候选数,所以要把下标推进到 idx + 1,让递归转向下一个候选数,配合选择分支里 idx 不变的重复使用逻辑,共同保证「跳过前进、选择原地」的回溯结构。",
    "wrongWhy": {
     "idx": "跳过后下标不变,会无限重复递归同一个「跳过 idx」的分支,永远到不了下一个候选数,导致栈溢出/死循环。",
     "idx - 1": "回退到已经处理过的下标,产生重复枚举甚至无限递归。",
     "idx + 2": "直接越过了 candidates[idx+1] 这个候选数,导致包含它的所有组合都被漏掉。"
    }
   },
   {
    "id": "p39-choose-branch-nonneg-boundary",
    "crux": "选择分支的边界须含 0",
    "answer": ">= 0",
    "blankOffset": 426,
    "blankLen": 4,
    "options": [
     ">= 0",
     "> 0",
     "!= 0"
    ],
    "why": "当 candidates[idx] 恰好等于剩余 target 时,target - candidates[idx] == 0,这一步选择必须被允许,因为下一层递归里 target == 0 就会收录当前组合;所以边界要用 >= 0 把「恰好用完」的情况包含进来。",
    "wrongWhy": {
     "> 0": "排除了 target - candidates[idx] == 0 的情况,导致「最后一个数正好等于剩余 target」这一步选择被跳过,遗漏所有恰好凑满的组合。",
     "!= 0": "放行了 target - candidates[idx] < 0 的非法选择,剩余 target 变成负数,后续递归永远不可能等于 0,产生大量无意义甚至逻辑错误的深层递归。"
    }
   },
   {
    "id": "p39-choose-branch-idx-unchanged-for-reuse",
    "crux": "选中当前数后 idx 保持不变以支持重复选取",
    "answer": "idx",
    "blankOffset": 553,
    "blankLen": 3,
    "options": [
     "idx",
     "idx + 1",
     "idx - 1"
    ],
    "why": "题目允许同一个数被无限次选取,所以选中 candidates[idx] 之后递归时下标要保持 idx 不变,下一层才能继续选择同一个候选数,直到 target 减到 0 或变负。",
    "wrongWhy": {
     "idx + 1": "选完当前数就跳到下一个下标,变成每个候选数只能用一次,无法得到「同一个数使用多次」的组合,结果集不完整。",
     "idx - 1": "回退到之前处理过的下标,造成重复枚举和潜在的无限递归。"
    }
   },
   {
    "id": "p39-backtrack-pop-back-restore-state",
    "crux": "递归返回后需要 pop_back 撤销选择",
    "answer": "combine.pop_back();",
    "blankOffset": 571,
    "blankLen": 19,
    "options": [
     "combine.pop_back();",
     "combine.clear();",
     "(无需任何操作)",
     "combine.erase(combine.begin());"
    ],
    "why": "回溯的核心就是「进入前压入、返回后撤销」,dfs 递归结束后必须把本层压入的 candidates[idx] 弹出,使 combine 恢复到选择前的状态,才能正确处理跳过分支或返回上一层继续枚举其他候选数。",
    "wrongWhy": {
     "combine.clear();": "会把 combine 中之前所有层已经确定的数字全部清空,而不是只撤销当前这一步,破坏上层已经选好的组合内容。",
     "(无需任何操作)": "不撤销会导致 combine 一直累积当前分支选过的数字,污染后续兄弟分支和跳过分支的组合结果,输出错误的组合。",
     "combine.erase(combine.begin());": "删除的是 combine 的第一个元素而非刚压入的最后一个元素,撤销的对象和顺序都错了,同样会破坏组合内容。"
    }
   }
  ]
 },
 {
  "id": 41,
  "title": "41. 缺失的第一个正数",
  "category": "普通数组",
  "difficulty": "hard",
  "descHtml": "<p>给你一个未排序的整数数组 <code>nums</code> ，请你找出其中没有出现的最小的正整数。</p>\n请你实现时间复杂度为 <code>O(n)</code> 并且只使用常数级别额外空间的解决方案。\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,0]\n<strong>输出：</strong>3\n<strong>解释：</strong>范围 [1,2] 中的数字都在数组中。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,4,-1,1]\n<strong>输出：</strong>2\n<strong>解释：</strong>1 在数组中，但 2 没有。</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [7,8,9,11,12]\n<strong>输出：</strong>1\n<strong>解释：</strong>最小的正数 1 没有出现。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int& num: nums) {\n            if (num <= 0) {\n                num = n + 1; // 非正数改成 n+1，使其不参与后续标记\n            }\n        }\n        for (int i = 0; i < n; ++i) {\n            int num = abs(nums[i]);\n            if (num <= n) {\n                nums[num - 1] = -abs(nums[num - 1]); // 值 num 出现过：给下标 num-1 处打负号标记\n            }\n        }\n        for (int i = 0; i < n; ++i) {\n            if (nums[i] > 0) {\n                return i + 1; // 第一个仍为正的位置，说明 i+1 未出现\n            }\n        }\n        return n + 1;\n    }\n};",
  "cards": [
   {
    "id": "p41-nonpositive-replace-condition",
    "crux": "把非正数改成 n+1 的判断条件必须是 <= 0（含 0），否则 0 留在数组里会导致 nums[0-1] 越界访问",
    "answer": "num <= 0",
    "blankOffset": 151,
    "blankLen": 8,
    "options": [
     "num <= 0",
     "num < 0",
     "num == 0",
     "num <= n"
    ],
    "why": "solutionText 指出答案必在 [1, n+1]，凡是 <=0 的数都不可能是答案也不能当有效下标，必须统一替换成 n+1 才能保证后续 abs(nums[num-1]) 取下标时不会碰到 0 或负数导致越界或误判。",
    "wrongWhy": {
     "num < 0": "0 不会被替换成 n+1，后续第二趟循环里 num=abs(nums[i])=0 时会执行 nums[0-1]=nums[-1]，产生数组越界访问（未定义行为）",
     "num == 0": "负数不会被替换，负数的 abs 值仍可能落在 [1,n] 区间内，会被误当成『出现过的正数』去打标记，污染判断结果",
     "num <= n": "会把所有 1..n 的正数也误改成 n+1，破坏原始数据，导致第二趟循环无法正确统计哪些数字出现过"
    }
   },
   {
    "id": "p41-mark-index-offset",
    "crux": "打标记时下标必须是 num-1（值 num 对应下标 num-1），偏移写错会导致标记全部错位一格",
    "answer": "num - 1",
    "blankOffset": 362,
    "blankLen": 7,
    "options": [
     "num - 1",
     "num",
     "num + 1"
    ],
    "why": "数组下标从 0 开始，而要标记的值域是 [1, n]，所以值 num 出现过要记在下标 num-1 处，这样最后『下标 i 为正』才能对应『值 i+1 未出现』。",
    "wrongWhy": {
     "num": "把标记打到下标 num 处（相当于记成『num+1 出现过』），标记整体错位一位，最终返回的『第一个为正的下标+1』会比真实缺失值偏差；且当 num==n 时 nums[num]=nums[n] 还会越界",
     "num + 1": "下标偏移错位；且当 num==n 时会访问 nums[num+1]=nums[n+1]（num==n-1 时访问 nums[n] 也已越界），超出数组合法下标范围 0..n-1，产生未定义行为"
    }
   },
   {
    "id": "p41-mark-negate-with-abs",
    "crux": "打负号标记前必须先 abs 再取负，否则对重复出现的数字二次打标记时会负负得正把标记抹掉",
    "answer": "-abs(nums[num - 1])",
    "blankOffset": 373,
    "blankLen": 19,
    "options": [
     "-abs(nums[num - 1])",
     "-nums[num - 1]",
     "abs(nums[num - 1])"
    ],
    "why": "solutionText 明确提示『易错：取值须用 abs』：nums[num-1] 可能已经被前面某次标记成负数了，若不先取 abs 直接取负，重复出现的数字会把已打好的负号标记又翻回正数，丢失标记。",
    "wrongWhy": {
     "-nums[num - 1]": "若 nums[num-1] 之前已经被标记为负数（对应值重复出现），再次执行 -nums[num-1] 会负负得正，把原本正确的负号标记误改回正数，导致该值被误判为『未出现』",
     "abs(nums[num - 1])": "根本没有取负，永远不会在该位置留下负号标记，第三趟循环里所有位置都判断为正，标记机制完全失效"
    }
   },
   {
    "id": "p41-mark-range-boundary",
    "crux": "只有 num<=n 的值才有对应下标可以打标记，写成 < n 会漏标最大值 n，导致答案本应是 n+1 却被误判成 n",
    "answer": "num <= n",
    "blankOffset": 329,
    "blankLen": 8,
    "options": [
     "num <= n",
     "num < n",
     "num <= n + 1"
    ],
    "why": "数组长度为 n，能被标记的合法下标范围是 num-1 ∈ [0, n-1]，即 num ∈ [1, n]，所以判断条件必须是 <= n 才能把值 n 也纳入标记范围。",
    "wrongWhy": {
     "num < n": "当 num==n 时不会被标记，即使数组恰好是 1..n 的排列（本应返回 n+1），下标 n-1 处也不会被打负号，第三趟循环会在下标 n-1 处发现『仍为正』而错误地提前返回 n",
     "num <= n + 1": "当 num == n+1 时会访问 nums[n]，超出数组合法下标范围 0..n-1，造成越界访问"
    }
   }
  ]
 },
 {
  "id": 42,
  "title": "42. 接雨水",
  "category": "双指针",
  "difficulty": "hard",
  "descHtml": "<p>给定&nbsp;<code>n</code> 个非负整数表示每个宽度为 <code>1</code> 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>height = [0,1,0,2,1,0,1,3,2,1,2,1]\n<strong>输出：</strong>6\n<strong>解释：</strong>上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 \n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>height = [4,2,0,3,2,5]\n<strong>输出：</strong>9\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == height.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int ans = 0;\n        int left = 0, right = height.size() - 1;\n        int leftMax = 0, rightMax = 0;\n        while (left < right) {\n            leftMax = max(leftMax, height[left]);\n            rightMax = max(rightMax, height[right]);\n            if (height[left] < height[right]) { // 哪侧矮结算哪侧：此时 left 处水量只由 leftMax 决定\n                ans += leftMax - height[left];\n                ++left;\n            } else {\n                ans += rightMax - height[right];\n                --right;\n            }\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p42-right-pointer-init-off-by-one",
    "crux": "right 初始值必须是 size()-1，否则首次访问就越界",
    "answer": "height.size() - 1",
    "blankOffset": 112,
    "blankLen": 17,
    "options": [
     "height.size() - 1",
     "height.size()",
     "height.size() - 2"
    ],
    "why": "right 是最后一个下标，必须是 height.size() - 1；否则后续 height[right] 会越界访问或漏掉最后一列。",
    "wrongWhy": {
     "height.size()": "这是数组长度而非最后一个合法下标，height[right] 会越界访问（未定义行为/崩溃）。",
     "height.size() - 2": "少算了最右边一列，right 从倒数第二个下标开始，最后一列永远不会被纳入 rightMax/结算，结果偏小或漏算。"
    }
   },
   {
    "id": "p42-trap-shorter-side-comparison-direction",
    "crux": "必须严格按 height[left] < height[right] 判断哪侧是短板，方向或等号写反会用错 leftMax/rightMax",
    "answer": "height[left] < height[right]",
    "blankOffset": 320,
    "blankLen": 28,
    "options": [
     "height[left] < height[right]",
     "height[left] > height[right]",
     "height[left] != height[right]"
    ],
    "why": "只有当 height[left] 严格小于 height[right] 时，right 侧才一定有更高的墙兜底，此时 left 处的短板必是 leftMax，用 leftMax 结算才是安全的；方向必须与谁在移动（left）保持对应。",
    "wrongWhy": {
     "height[left] > height[right]": "方向反了：left 更矮时反而走 else 分支用 rightMax 结算 left 侧本该由 leftMax 决定的水量，短板不变量被破坏，结果错误。",
     "height[left] != height[right]": "当 height[left] 实际比 height[right] 更高时也会误入 if 分支，用 leftMax 结算本该由 rightMax 决定的一侧，破坏算法的不变量导致结果错误。"
    }
   },
   {
    "id": "p42-trap-ans-index-match-with-branch-pointer",
    "crux": "if 分支里累加水量用的下标必须和被移动的指针一致（left 分支用 height[left]）",
    "answer": "height[left]",
    "blankOffset": 421,
    "blankLen": 12,
    "options": [
     "height[left]",
     "height[right]",
     "leftMax"
    ],
    "why": "当前正在结算并即将移动的是 left 指针，水量必须用 leftMax 减去 left 处的高度 height[left]，保证结算的列和移动的指针是同一列。",
    "wrongWhy": {
     "height[right]": "下标写成了另一侧的 right，实际结算的列（left）和用来减的高度（right 处高度）不一致，累加出的水量与真实几何含义脱节，结果错误。",
     "leftMax": "leftMax - leftMax 恒为 0，这一步会漏算 left 处应有的水量，导致总量偏小。"
    }
   }
  ]
 },
 {
  "id": 45,
  "title": "45. 跳跃游戏 II",
  "category": "贪心算法",
  "difficulty": "medium",
  "descHtml": "<p>给定一个长度为 <code>n</code> 的 <strong>0 索引</strong>整数数组 <code>nums</code>。初始位置在下标 0。</p>\n\n<p>每个元素 <code>nums[i]</code> 表示从索引 <code>i</code> 向后跳转的最大长度。换句话说，如果你在索引&nbsp;<code>i</code>&nbsp;处，你可以跳转到任意 <code>(i + j)</code> 处：</p>\n\n<ul>\n\t<li><code>0 &lt;= j &lt;= nums[i]</code>&nbsp;且</li>\n\t<li><code>i + j &lt; n</code></li>\n</ul>\n\n<p>返回到达&nbsp;<code>n - 1</code>&nbsp;的最小跳跃次数。测试用例保证可以到达 <code>n - 1</code>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,1,1,4]\n<strong>输出:</strong> 2\n<strong>解释:</strong> 跳到最后一个位置的最小跳跃数是 <code>2</code>。\n&nbsp;    从下标为 0 跳到下标为 1 的位置，跳&nbsp;<code>1</code>&nbsp;步，然后跳&nbsp;<code>3</code>&nbsp;步到达数组的最后一个位置。\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,0,1,4]\n<strong>输出:</strong> 2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li>题目保证可以到达&nbsp;<code>n - 1</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        int maxPos = 0, n = nums.size(), end = 0, step = 0; // end=当前步数可达的右边界，maxPos=下一步可达的最远位置\n        for (int i = 0; i < n - 1; ++i) {\n            if (maxPos >= i) {\n                maxPos = max(maxPos, i + nums[i]);\n                if (i == end) { // 当前这一层走完，必须再跳一步\n                    end = maxPos;\n                    ++step;\n                }\n            }\n        }\n        return step;\n    }\n};",
  "cards": [
   {
    "id": "p45-jump-loop-bound-n-minus-1",
    "crux": "循环边界必须是 n - 1（不访问最后一个下标），否则恰好跳到终点那次会多算一步",
    "answer": "n - 1",
    "blankOffset": 183,
    "blankLen": 5,
    "options": [
     "n - 1",
     "n",
     "n - 2"
    ],
    "why": "solutionText 明确指出：循环只到 n-2（即 i < n-1），不访问最后一个位置，否则恰好落在终点时会多算一步；因为最后一个位置不需要再跳，遍历到它并触发 i==end 会导致多加一次 step。",
    "wrongWhy": {
     "n": "会让 i 走到 n-1（最后一个下标）。如果恰好此时 i==end（终点正好是上一层跳到的边界），会误触发 end=maxPos; ++step，多算一次不需要的跳跃。以 nums=[1,1] 验证：正确答案 1，用 i<n 会返回 2。",
     "n - 2": "循环变成 i < n-2，实际只遍历到下标 n-3，会漏掉对下标 n-2 的 maxPos 更新和分层判断。以 nums=[1,1] 验证：i<0 一次都不进循环，返回 0，而正确答案是 1，步数偏小。"
    }
   },
   {
    "id": "p45-jump-layer-trigger-i-eq-end",
    "crux": "进入下一层（步数+1）的触发条件必须是 i == end：走到当前层右边界的最后一个下标才跳，用 maxPos 参与比较会破坏分层",
    "answer": "i == end",
    "blankOffset": 299,
    "blankLen": 8,
    "options": [
     "i == end",
     "i == maxPos",
     "maxPos == end"
    ],
    "why": "end 表示当前步数能到达的右边界，i 从 0 单调递增且每次只加 1，恰好等于 end 时说明本层所有下标都已经用来更新过 maxPos，此时才应该把 end 更新为 maxPos 并让 step 加一；用等号保证每层只触发一次跳跃计数。",
    "wrongWhy": {
     "i == maxPos": "maxPos 每步被更新为 i + nums[i] 的最大值，合法输入下总能前进，故通常 maxPos > i，i == maxPos 几乎不成立，触发条件几乎永不满足，step 无法正确累加，返回值偏小甚至恒为 0，分层计步逻辑失效。",
     "maxPos == end": "maxPos 在本层内会不断被更新增大，通常会大于 end 而不会等于它，导致该条件几乎不会成立或错误地提前/延后成立，使分层逻辑失效，最终 step 统计错误。"
    }
   }
  ]
 },
 {
  "id": 46,
  "title": "46. 全排列",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给定一个不含重复数字的数组 <code>nums</code> ，返回其 <em>所有可能的全排列</em> 。你可以 <strong>按任意顺序</strong> 返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1]\n<strong>输出：</strong>[[0,1],[1,0]]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1]\n<strong>输出：</strong>[[1]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 6</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>\n</ul>",
  "code": "class Solution {\npublic:\n    void backtrack(vector<vector<int>>& res, vector<int>& output, int first, int len){\n        // 所有数都填完了\n        if (first == len) {\n            res.emplace_back(output);\n            return;\n        }\n        for (int i = first; i < len; ++i) {\n            // 动态维护数组\n            swap(output[i], output[first]);\n            // 继续递归填下一个数\n            backtrack(res, output, first + 1, len);\n            // 撤销操作\n            swap(output[i], output[first]);\n        }\n    }\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int> > res;\n        backtrack(res, nums, 0, (int)nums.size());\n        return res;\n    }\n};",
  "cards": [
   {
    "id": "p46-for-i-start-first",
    "crux": "内层for循环的起始下标必须是 first，而不是 0 或 first+1",
    "answer": "i = first",
    "blankOffset": 244,
    "blankLen": 9,
    "options": [
     "i = first",
     "i = 0",
     "i = first + 1"
    ],
    "why": "数组左段 [0, first) 是已经确定好的排列前缀，右段 [first, len) 才是本层待填的候选集合，所以 i 必须从 first 开始遍历待填区间。",
    "wrongWhy": {
     "i = 0": "会把已经固定好的前缀部分也纳入交换范围，破坏“左段已定、右段待填”的不变量，导致重复交换、产生错误或重复的排列。",
     "i = first + 1": "漏掉了 i == first 这一种情况，即“当前位保持原值不动”的分支被跳过，导致以该位置原始数字开头的那批排列全部丢失。"
    }
   },
   {
    "id": "p46-for-i-lt-len",
    "crux": "内层for循环的终止条件必须是 i < len，不能写成 <= 或 len-1",
    "answer": "i < len",
    "blankOffset": 255,
    "blankLen": 7,
    "options": [
     "i < len",
     "i <= len",
     "i < len - 1"
    ],
    "why": "数组合法下标范围是 [0, len)，i 需要遍历到 len-1 才能覆盖全部待填候选，len 是 nums.size()，不是最后一个合法下标。",
    "wrongWhy": {
     "i <= len": "i 会取到 len，此时 output[len] 越界访问，属于未定义行为（数组越界）。",
     "i < len - 1": "会漏掉 i == len-1 这个候选，导致所有以最后一个元素为该位置选择的排列都不会被枚举。"
    }
   }
  ]
 },
 {
  "id": 48,
  "title": "48. 旋转图像",
  "category": "矩阵",
  "difficulty": "medium",
  "descHtml": "<p>给定一个 <em>n&nbsp;</em>×&nbsp;<em>n</em> 的二维矩阵&nbsp;<code>matrix</code> 表示一个图像。请你将图像顺时针旋转 90 度。</p>\n\n<p>你必须在<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\"> 原地</a></strong> 旋转图像，这意味着你需要直接修改输入的二维矩阵。<strong>请不要 </strong>使用另一个矩阵来旋转图像。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>输出：</strong>[[7,4,1],[8,5,2],[9,6,3]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n<strong>输出：</strong>[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == matrix.length == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n &lt;= 20</code></li>\n\t<li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li>\n</ul>\n\n<p>&nbsp;</p>",
  "code": "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        int n = matrix.size();\n        // 水平翻转\n        for (int i = 0; i < n / 2; ++i) {\n            for (int j = 0; j < n; ++j) {\n                swap(matrix[i][j], matrix[n - i - 1][j]);\n            }\n        }\n        // 主对角线翻转\n        for (int i = 0; i < n; ++i) {\n            for (int j = 0; j < i; ++j) {\n                swap(matrix[i][j], matrix[j][i]);\n            }\n        }\n    }\n};",
  "cards": [
   {
    "id": "p48-rotate-horizontal-flip-half-rows",
    "crux": "水平翻转只能遍历前 n/2 行，不能遍历整个矩阵",
    "answer": "n / 2",
    "blankOffset": 147,
    "blankLen": 5,
    "options": [
     "n / 2",
     "n",
     "n / 2 - 1",
     "n - 1"
    ],
    "why": "顺时针旋转由「水平翻转 + 主对角线翻转」复合而成，水平翻转要把上下对称的两行互换一次；若 i 遍历到 n/2 之外，同一对行会被换两次而换回原样，等价于没翻转（solutionText 明确指出「两次翻转各只遍历一半区域，扫全矩阵会换回原样」）。",
    "wrongWhy": {
     "n": "遍历整个矩阵会让每一对镜像行被 swap 两次，第二次又换回原值，最终矩阵和翻转前完全一样，等于白做。",
     "n / 2 - 1": "当 n 为偶数时会少翻转中间一对行（如 n=4 时只翻 i=0，漏掉 i=1），矩阵翻转不完整。",
     "n - 1": "i 遍历到 n-2，多数镜像行被 swap 两次又换回、少数只换一次，行序错乱，得不到正确的上下镜像（下标始终在合法范围内，问题不是越界而是翻转失效）。"
    }
   },
   {
    "id": "p48-rotate-diagonal-flip-lower-triangle",
    "crux": "主对角线翻转只能遍历下三角 j < i，不能遍历整行",
    "answer": "i",
    "blankOffset": 373,
    "blankLen": 1,
    "options": [
     "i",
     "n",
     "n / 2",
     "i - 1"
    ],
    "why": "主对角线翻转是把 (i,j) 与 (j,i) 互换，对角线上方与下方是同一对元素的两次表示；只需遍历下三角（j<i）交换一次即可覆盖所有非对角元素，j 到 i 为止且不含 i 本身（对角线元素 i==j 换自己无意义）。",
    "wrongWhy": {
     "n": "j 会遍历到 i 之后，导致每一对 (i,j)/(j,i) 被交换两次，第二次又换回原值，主对角线翻转失效。",
     "n / 2": "翻转范围与 i 无关地固定成 n/2，会导致有些行翻转不全、有些行翻转过界或重复，破坏对角线对称交换的正确性。",
     "i - 1": "j 只遍历到 i-2，漏掉了 j==i-1 这一对 (i,i-1)/(i-1,i) 元素未交换，下三角翻转不完整、对角线两侧不再对称，得不到正确旋转结果。"
    }
   },
   {
    "id": "p48-rotate-horizontal-flip-mirror-row-index",
    "crux": "水平翻转时镜像行下标是 n - i - 1，不是 n - i 或 i",
    "answer": "n - i - 1",
    "blankOffset": 245,
    "blankLen": 9,
    "options": [
     "n - i - 1",
     "n - i",
     "n - i - 2",
     "i"
    ],
    "why": "数组下标从 0 开始，第 i 行（从上往下第 i+1 行）对应的镜像行是从下往上数第 i+1 行，即下标 n-1-i；hints 中也明确写出 swap(matrix[i][j], matrix[n-1-i][j])。",
    "wrongWhy": {
     "n - i": "少减了 1，当 i=0 时会访问 matrix[n][j] 越界（下标最大只到 n-1），直接导致数组越界崩溃。",
     "n - i - 2": "多减了 1，镜像行整体偏移一行，导致翻转结果与正确镜像行错位，翻转后的矩阵不是真正的上下镜像。",
     "i": "变成 matrix[i][j] 和自身交换，水平翻转完全没有发生，等价于跳过了这一步。"
    }
   }
  ]
 },
 {
  "id": 49,
  "title": "49. 字母异位词分组",
  "category": "哈希",
  "difficulty": "medium",
  "descHtml": "<p>给你一个字符串数组，请你将 <span data-keyword=\"anagram\">字母异位词</span> 组合在一起。可以按任意顺序返回结果列表。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]</p>\n\n<p><strong>输出: </strong>[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]</p>\n\n<p><strong>解释：</strong></p>\n\n<ul>\n\t<li>在 strs 中没有字符串可以通过重新排列来形成 <code>\"bat\"</code>。</li>\n\t<li>字符串 <code>\"nat\"</code> 和 <code>\"tan\"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>\n\t<li>字符串 <code>\"ate\"</code>&nbsp;，<code>\"eat\"</code>&nbsp;和 <code>\"tea\"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>\n</ul>\n</div>\n\n<p><strong>示例 2:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"\"]</p>\n\n<p><strong>输出: </strong>[[\"\"]]</p>\n</div>\n\n<p><strong>示例 3:</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入:</strong> strs = [\"a\"]</p>\n\n<p><strong>输出: </strong>[[\"a\"]]</p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>\n\t<li><code>strs[i]</code>&nbsp;仅包含小写字母</li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (string& str: strs) {\n            string key = str;\n            sort(key.begin(), key.end()); // 排序后的副本作为分组的键，原串不动\n            mp[key].emplace_back(str);\n        }\n        vector<vector<string>> ans;\n        for (auto it = mp.begin(); it != mp.end(); ++it) {\n            ans.emplace_back(it->second);\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p49-key-must-be-copy-not-reference",
    "crux": "签名key必须是str的拷贝，不能是引用/直接对str排序，否则原串会被排序破坏",
    "answer": "string key = str;",
    "blankOffset": 186,
    "blankLen": 17,
    "options": [
     "string key = str;",
     "string& key = str;",
     "string key(str.begin(), str.end() - 1);"
    ],
    "why": "solutionText明确指出「排序的是键的副本，原串要原样放入桶中，不能把原串排了序」。`string key = str;` 触发string的拷贝构造，key与str是两块独立内存，后续sort(key...)只打乱key，不影响str，emplace_back(str)时才能存入原始未打乱的字符串。",
    "wrongWhy": {
     "string& key = str;": "key变成str的引用而非独立拷贝，sort(key.begin(), key.end())实际上直接原地排序了str本身，导致emplace_back(str)时存入的也是被打乱字母顺序的字符串，丢失了原始字符串，输出结果内容错误",
     "string key(str.begin(), str.end() - 1);": "用迭代器区间构造时少拷贝了最后一个字符（end()-1），key会比str少一位，排序后的签名不完整，导致本该同组的异位词因为签名少一个字符而被误判为不同签名，分组出错甚至可能因空串或越界迭代器行为未定义"
    }
   }
  ]
 },
 {
  "id": 51,
  "title": "51. N 皇后",
  "category": "回溯",
  "difficulty": "hard",
  "descHtml": "<p>按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。</p>\n\n<p><strong>n&nbsp;皇后问题</strong> 研究的是如何将 <code>n</code>&nbsp;个皇后放置在 <code>n×n</code> 的棋盘上，并且使皇后彼此之间不能相互攻击。</p>\n\n<p>给你一个整数 <code>n</code> ，返回所有不同的&nbsp;<strong>n<em>&nbsp;</em>皇后问题</strong> 的解决方案。</p>\n\n<div class=\"original__bRMd\">\n<div>\n<p>每一种解法包含一个不同的&nbsp;<strong>n 皇后问题</strong> 的棋子放置方案，该方案中 <code>'Q'</code> 和 <code>'.'</code> 分别代表了皇后和空位。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 4\n<strong>输出：</strong>[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n<strong>解释：</strong>如上图所示，4 皇后问题存在两个不同的解法。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 1\n<strong>输出：</strong>[[\"Q\"]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 9</code></li>\n</ul>\n</div>\n</div>",
  "code": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        auto solutions = vector<vector<string>>();\n        auto queens = vector<int>(n, -1);\n        auto columns = unordered_set<int>();\n        auto diagonals1 = unordered_set<int>();\n        auto diagonals2 = unordered_set<int>();\n        backtrack(solutions, queens, n, 0, columns, diagonals1, diagonals2);\n        return solutions;\n    }\n\n    void backtrack(vector<vector<string>> &solutions, vector<int> &queens, int n, int row, unordered_set<int> &columns, unordered_set<int> &diagonals1, unordered_set<int> &diagonals2) {\n        if (row == n) {\n            vector<string> board = generateBoard(queens, n);\n            solutions.push_back(board);\n        } else {\n            for (int i = 0; i < n; i++) {\n                if (columns.find(i) != columns.end()) {\n                    continue;\n                }\n                int diagonal1 = row - i; // 同一条主对角线上 row - col 恒定\n                if (diagonals1.find(diagonal1) != diagonals1.end()) {\n                    continue;\n                }\n                int diagonal2 = row + i; // 同一条副对角线上 row + col 恒定\n                if (diagonals2.find(diagonal2) != diagonals2.end()) {\n                    continue;\n                }\n                queens[row] = i;\n                columns.insert(i);\n                diagonals1.insert(diagonal1);\n                diagonals2.insert(diagonal2);\n                backtrack(solutions, queens, n, row + 1, columns, diagonals1, diagonals2);\n                queens[row] = -1;\n                columns.erase(i);\n                diagonals1.erase(diagonal1);\n                diagonals2.erase(diagonal2);\n            }\n        }\n    }\n\n    vector<string> generateBoard(vector<int> &queens, int n) {\n        auto board = vector<string>();\n        for (int i = 0; i < n; i++) {\n            string row = string(n, '.');\n            row[queens[i]] = 'Q';\n            board.push_back(row);\n        }\n        return board;\n    }\n};",
  "cards": [
   {
    "id": "p51-nqueens-row-eq-n-termination",
    "crux": "回溯终止条件必须是 row == n（放完 n 行才生成棋盘），写成 n-1 或方向反了都会导致漏放一行或状态错乱。",
    "answer": "row == n",
    "blankOffset": 616,
    "blankLen": 8,
    "options": [
     "row == n",
     "row == n - 1",
     "row > n",
     "row != n"
    ],
    "why": "row 从 0 开始，每递归一层放置一行皇后并 row+1，当 row 等于 n 时说明第 0..n-1 共 n 行皇后都已放置完毕，此时才应该按 queens 生成棋盘、记入答案。",
    "wrongWhy": {
     "row == n - 1": "会在最后一行（第 n-1 行）皇后还没放置时就提前生成棋盘，实际只放了 n-1 个皇后，得到的棋盘不完整、答案错误。",
     "row > n": "row 从 0 每次只 +1，会恰好等于 n 而不会跳过；写成 row > n 后，在 row == n 本该终止时条件不成立，转而进入 else 对第 n 行继续放置——queens[row] = i 会以下标 n 写越界（queens 长度只有 n），触发数组越界的未定义行为，终止逻辑被破坏。",
     "row != n": "与正确条件方向相反：一进入递归（row=0，还没放任何皇后）该条件就成立，直接对全是 -1 的 queens 生成棋盘，既把空/未完成状态当成解，generateBoard 里 row[queens[i]] 又以下标 -1 越界写入，逻辑完全反了。"
    }
   },
   {
    "id": "p51-nqueens-column-loop-bound",
    "crux": "枚举当前行放置列号的循环上界必须是 i < n，写成 <= n 会越界访问棋盘字符串，写成 n-1 会漏掉最后一列。",
    "answer": "i < n",
    "blankOffset": 774,
    "blankLen": 5,
    "options": [
     "i < n",
     "i <= n",
     "i < n - 1"
    ],
    "why": "列号 i 的合法取值范围是 0 到 n-1（棋盘共 n 列），i < n 恰好覆盖全部合法列，既不遗漏也不越界。",
    "wrongWhy": {
     "i <= n": "会多试一次 i == n 这个不存在的列，queens[row] = n、后续 generateBoard 里 row[queens[i]] = 'Q' 会对长度为 n 的字符串写下标 n，产生越界写入（未定义行为/崩溃）。",
     "i < n - 1": "少枚举最后一列 i == n-1，导致某些必须把皇后放在最后一列的解永远搜索不到，最终解的数量比正确答案少。"
    }
   },
   {
    "id": "p51-nqueens-recurse-next-row",
    "crux": "递归调用必须传 row + 1 进入下一行，写成 row 会原地重复递归导致栈溢出，写成 row - 1 会倒退回已处理的行。",
    "answer": "row + 1",
    "blankOffset": 1468,
    "blankLen": 7,
    "options": [
     "row + 1",
     "row",
     "row - 1",
     "i + 1"
    ],
    "why": "按行回溯的核心是每递归一层处理下一行，放完当前行第 row 行后必须让子递归从 row + 1 行继续，否则无法逐行推进完成整个棋盘。",
    "wrongWhy": {
     "row": "递归时行号不变，子调用又会在同一行 row 重新枚举列，行号永远无法到达 n，形成无限递归直至栈溢出。",
     "row - 1": "递归回退到上一行，会不断在已经处理过的行之间来回递归，既重复计算又永远无法前进到 row == n 的终止条件。",
     "i + 1": "把当前行枚举的列号 i 误当作下一行的行号传入，行列语义完全错乱，后续 queens[row] 的 row 与实际递归深度脱节，生成的棋盘和冲突判断全部失真。"
    }
   },
   {
    "id": "p51-nqueens-undo-diagonals2-symmetry",
    "crux": "回溯撤销时必须用同一个 diagonal2 变量对 diagonals2 做 erase，和插入时的键完全对称，用错集合或用错键都会导致状态残留而不报错。",
    "answer": "diagonals2.erase(diagonal2)",
    "blankOffset": 1640,
    "blankLen": 27,
    "options": [
     "diagonals2.erase(diagonal2)",
     "diagonals2.erase(diagonal1)",
     "diagonals1.erase(diagonal2)",
     "diagonals2.erase(i)"
    ],
    "why": "撤销操作必须和放置操作完全对称：diagonals2 插入的键是 diagonal2（row + i），回溯时也必须用同一个 diagonal2 值去 erase，才能真正清除这次尝试在副对角线集合里留下的标记，让上一层继续枚举其它列时状态是干净的。",
    "wrongWhy": {
     "diagonals2.erase(diagonal1)": "用主对角线的键 diagonal1(row-i) 去 erase 副对角线集合，本次真正插入的 diagonal2(row+i) 得不到清除、一直残留，后续本该合法的位置被误判为副对角线冲突，漏解且难以察觉。",
     "diagonals1.erase(diagonal2)": "集合和键都搞反：diagonals2 里这次插入的 diagonal2 没被撤销、状态残留；同时又可能误删 diagonals1 里恰好等于 diagonal2 数值的合法记录，破坏另一条主对角线的冲突状态。",
     "diagonals2.erase(i)": "用列号 i 当作副对角线的键去 erase，除 row=0 外几乎不可能命中真正的 diagonal2(row+i)，导致本次插入的副对角线标记清不掉，之后经过该副对角线的合法列都会被误判为冲突，解的数量偏少。"
    }
   },
   {
    "id": "p51-nqueens-diagonal1-formula",
    "crux": "主对角线的标识必须用 row - i（与副对角线 row + i 的加号区分开），公式写混会让两条对角线用同一套键，冲突检测直接失效。",
    "answer": "row - i",
    "blankOffset": 924,
    "blankLen": 7,
    "options": [
     "row - i",
     "row + i"
    ],
    "why": "左上到右下的主对角线上所有格子满足 row - col 为同一个常数，用 row - i 作为主对角线的唯一标识；它必须和副对角线用的 row + i 是不同的公式，两个哈希集合才能分别独立地检测两种方向的对角线冲突。",
    "wrongWhy": {
     "row + i": "和 diagonal2 的公式完全一样，diagonals1、diagonals2 实际记录的都是副对角线信息，主对角线的冲突从此永远不会被 diagonals1 检测出来，导致同一条主对角线上放了多个皇后也不会被识别为冲突，输出错误的解。"
    }
   }
  ]
 },
 {
  "id": 53,
  "title": "53. 最大子数组和",
  "category": "普通数组",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。</p>\n\n<p><strong><span data-keyword=\"subarray-nonempty\">子数组 </span></strong>是数组中的一个连续部分。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-2,1,-3,4,-1,2,1,-5,4]\n<strong>输出：</strong>6\n<strong>解释：</strong>连续子数组&nbsp;[4,-1,2,1] 的和最大，为&nbsp;6 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1]\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [5,4,-1,7,8]\n<strong>输出：</strong>23\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>如果你已经实现复杂度为 <code>O(n)</code> 的解法，尝试使用更为精妙的 <strong>分治法</strong> 求解。</p>",
  "code": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int pre = 0, maxAns = nums[0];\n        for (const auto &x: nums) {\n            pre = max(pre + x, x); // 以 x 结尾的最大子数组和：接上前一段或另起一段\n            maxAns = max(maxAns, pre);\n        }\n        return maxAns;\n    }\n};",
  "cards": [
   {
    "id": "p53-maxans-init-nums0",
    "crux": "maxAns 必须初始化为 nums[0]，而不是 0 或哨兵值，否则全负数组会算错",
    "answer": "nums[0]",
    "blankOffset": 96,
    "blankLen": 7,
    "options": [
     "nums[0]",
     "0",
     "INT_MAX"
    ],
    "why": "maxAns 要保存遍历过程中出现过的所有 pre 的最大值，初值必须是数组里真实存在（或不高于真实答案）的一个值。取 nums[0] 保证了：当数组全为负数时，maxAns 一开始就等于一个真实的候选和（第一个元素），后续 max(maxAns, pre) 才能正确收敛到全负数组里那个『最大的负数』，而不会被一个不属于数组的数值污染结果。",
    "wrongWhy": {
     "0": "当数组全为负数（如 [-2,-1]）时，0 比任何一个真实子数组和都大，maxAns 会一直停留在 0 上而不会被负的 pre 更新，最终返回 0，而正确答案应该是 -1。",
     "INT_MAX": "初值比任何可能的 pre 都大，max(maxAns, pre) 永远选中 INT_MAX 本身，maxAns 永远不会被真实的 pre 更新，最终返回一个荒谬的极大值而不是子数组和。"
    }
   },
   {
    "id": "p53-pre-transfer-max-restart",
    "crux": "转移方程必须是 max(pre + x, x)——用『接上』和『以 x 另起一段』做比较，而不是把 0 或旧 pre 混入比较",
    "answer": "pre + x, x",
    "blankOffset": 163,
    "blankLen": 10,
    "options": [
     "pre + x, x",
     "pre + x, 0",
     "pre, pre + x"
    ],
    "why": "pre 表示『以当前元素 x 结尾』的最大子数组和，只有两种可能：接上前一段（pre + x）或者放弃前面、从 x 自己重新开始（x）。二者取较大值才能保证 pre 始终对应一个以 x 结尾、且真实存在的子数组和，从而覆盖全负数组等边界情况。",
    "wrongWhy": {
     "pre + x, 0": "max(pre + x, 0) 会把运行和钳制到不小于 0，pre 永远不会为负。全负数组（如 [-2,-1]）时 pre 恒为 0，maxAns 也随之停在 0，最终返回 0 而非正确的 -1。",
     "pre, pre + x": "这里只是在『继续沿用旧的 pre』和『接上 x』之间选大，完全丢失了『以 x 单独另起一段』这个选项；当前面累积和是很大的负数、本该丢弃并从 x 重新开始时，公式里没有单独的 x 分支，pre 无法重置，会算出语义错误的中间值。"
    }
   }
  ]
 },
 {
  "id": 54,
  "title": "54. 螺旋矩阵",
  "category": "矩阵",
  "difficulty": "medium",
  "descHtml": "<p>给你一个 <code>m</code> 行 <code>n</code> 列的矩阵 <code>matrix</code> ，请按照 <strong>顺时针螺旋顺序</strong> ，返回矩阵中的所有元素。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>输出：</strong>[1,2,3,6,9,8,7,4,5]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n<strong>输出：</strong>[1,2,3,4,8,12,11,10,9,5,6,7]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 <= m, n <= 10</code></li>\n\t<li><code>-100 <= matrix[i][j] <= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        if (matrix.size() == 0 || matrix[0].size() == 0) {\n            return {};\n        }\n\n        int rows = matrix.size(), columns = matrix[0].size();\n        vector<int> order;\n        int left = 0, right = columns - 1, top = 0, bottom = rows - 1;\n        while (left <= right && top <= bottom) {\n            for (int column = left; column <= right; column++) {\n                order.push_back(matrix[top][column]);\n            }\n            for (int row = top + 1; row <= bottom; row++) {\n                order.push_back(matrix[row][right]);\n            }\n            if (left < right && top < bottom) { // 该层至少两行两列才走下边和左边，防单行/单列重复\n                for (int column = right - 1; column > left; column--) {\n                    order.push_back(matrix[bottom][column]);\n                }\n                for (int row = bottom; row > top; row--) {\n                    order.push_back(matrix[row][left]);\n                }\n            }\n            left++;\n            right--;\n            top++;\n            bottom--;\n        }\n        return order;\n    }\n};",
  "cards": [
   {
    "id": "p54-spiral-while-boundary-lte",
    "crux": "外层循环条件必须是 left<=right && top<=bottom（等号），否则最后一行/一列不会被遍历",
    "answer": "left <= right && top <= bottom",
    "blankOffset": 352,
    "blankLen": 30,
    "options": [
     "left <= right && top <= bottom",
     "left < right && top < bottom",
     "left <= right || top <= bottom",
     "left < right || top < bottom"
    ],
    "why": "只要还剩下至少一行或一列没被剥完（left==right 或 top==bottom 时仍有元素），就必须继续循环，所以要用 <= 而不是 <；同时必须两个方向都还没收缩完才继续，所以是 && 而不是 ||（否则一个方向先收缩完了另一个方向还会继续跑越界）。",
    "wrongWhy": {
     "left < right && top < bottom": "用 < 会在只剩最后一行或最后一列时提前退出循环，导致这一行/列元素漏掉",
     "left <= right || top <= bottom": "用 || 会导致某一方向已经收缩完（如 left>right）但另一方向仍满足条件时继续循环，访问越界的行/列下标",
     "left < right || top < bottom": "同时具有 < 和 || 两处错误，既会漏掉最后一行/列，又可能在某方向已收缩完时越界继续"
    }
   },
   {
    "id": "p54-spiral-right-col-row-start",
    "crux": "遍历右边列时起始行必须是 top+1，跳过已经在上边收集过的 matrix[top][right]",
    "answer": "top + 1",
    "blankOffset": 546,
    "blankLen": 7,
    "options": [
     "top + 1",
     "top",
     "top + 2",
     "bottom"
    ],
    "why": "上边遍历（for column=left..right）已经把 matrix[top][right] 收集过了，右边列必须从 top+1 开始，否则这个元素会被重复收集一次。",
    "wrongWhy": {
     "top": "会把上边已经收集过的 matrix[top][right] 再收集一次，导致结果里出现重复元素",
     "top + 2": "会跳过 matrix[top+1][right] 这个本应收集的元素，导致结果缺元素",
     "bottom": "循环起点大于等于终点，右边列基本不会被收集（单行情形下更是彻底跳过应有的元素）"
    }
   },
   {
    "id": "p54-spiral-guard-single-row-col-lt",
    "crux": "下边和左边只有在 left<right && top<bottom（严格小于）时才走，避免单行/单列层被重复遍历",
    "answer": "left < right && top < bottom",
    "blankOffset": 662,
    "blankLen": 28,
    "options": [
     "left < right && top < bottom",
     "left <= right && top <= bottom",
     "left < right || top < bottom",
     "left <= right && top < bottom"
    ],
    "why": "当这一层退化成只有一行（top==bottom）或只有一列（left==right）时，上边遍历已经把这一行/列的所有元素收集完，若还走下边和左边就会把同样的元素再收集一遍；用严格小于就能在退化情形下跳过。",
    "wrongWhy": {
     "left <= right && top <= bottom": "用 <= 时，left==right 或 top==bottom（单行/单列）的退化情形仍会进入分支，导致这些元素被上边和下边（或左右）重复收集",
     "left < right || top < bottom": "用 || 只需一个方向满足即可进入分支，会在另一个方向已经退化（如 top==bottom）时仍执行下边/左边遍历，造成重复",
     "left <= right && top < bottom": "只对行方向收紧到严格小于，却允许 left==right（单列层）进入分支：此时右边列已把整列收完，左边遍历又会沿同一列自下而上再收一遍，产生重复元素"
    }
   },
   {
    "id": "p54-spiral-bottom-col-start-minus1",
    "crux": "下边遍历（从右往左）起始列必须是 right-1，跳过已在右边列收集过的 matrix[bottom][right]",
    "answer": "right - 1",
    "blankOffset": 756,
    "blankLen": 9,
    "options": [
     "right - 1",
     "right",
     "right - 2",
     "left"
    ],
    "why": "右边列遍历已经收集了 matrix[bottom][right]（当 bottom 在 top+1..bottom 范围内时），下边遍历必须从 right-1 开始才不会重复收集这个元素。",
    "wrongWhy": {
     "right": "会把右边列已经收集过的 matrix[bottom][right] 再收集一次，产生重复元素",
     "right - 2": "会跳过 matrix[bottom][right-1] 这个本应收集的元素，导致结果缺元素",
     "left": "循环条件是 column > left，起点直接等于 left 会让循环体一次都不执行，下边整行元素全部丢失（只剩最后一个由左边遍历补上）"
    }
   },
   {
    "id": "p54-spiral-left-col-row-start-bottom",
    "crux": "左边遍历（从下往上）起始行必须是 bottom（不是 bottom-1），因为 matrix[bottom][left] 还没被下边遍历收集过",
    "answer": "bottom",
    "blankOffset": 904,
    "blankLen": 6,
    "options": [
     "bottom",
     "bottom - 1",
     "top",
     "bottom + 1"
    ],
    "why": "下边遍历的终止条件是 column > left，即遍历到 left+1 为止，不包含 matrix[bottom][left]，所以左边遍历必须从 bottom 开始把这个元素补上，否则会漏掉。",
    "wrongWhy": {
     "bottom - 1": "会漏掉 matrix[bottom][left] 这个元素，因为下边遍历并没有收集它，左边遍历又跳过了它，导致结果缺元素",
     "top": "循环条件是 row > top，起点等于 top 会让循环体一次都不执行，整条左边列元素全部丢失",
     "bottom + 1": "row=bottom+1 会越界访问 matrix[bottom+1][left]，导致数组越界或访问到下一层还未处理的数据"
    }
   }
  ]
 },
 {
  "id": 55,
  "title": "55. 跳跃游戏",
  "category": "贪心算法",
  "difficulty": "medium",
  "descHtml": "<p>给你一个非负整数数组&nbsp;<code>nums</code> ，你最初位于数组的 <strong>第一个下标</strong> 。数组中的每个元素代表你在该位置可以跳跃的最大长度。</p>\n\n<p>判断你是否能够到达最后一个下标，如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,3,1,1,4]\n<strong>输出：</strong>true\n<strong>解释：</strong>可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,1,0,4]\n<strong>输出：</strong>false\n<strong>解释：</strong>无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int n = nums.size();\n        int rightmost = 0; // 目前可达的最远下标，不变量：所有 <= rightmost 的位置都可达\n        for (int i = 0; i < n; ++i) {\n            if (i <= rightmost) {\n                rightmost = max(rightmost, i + nums[i]);\n                if (rightmost >= n - 1) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n};",
  "cards": [
   {
    "id": "p55-guard-i-le-rightmost",
    "crux": "遍历到 i 时，只有 i 本身可达（i <= rightmost）才能用它去更新 rightmost，否则 i 已经不可达，用它更新是错误的",
    "answer": "i <= rightmost",
    "blankOffset": 213,
    "blankLen": 14,
    "options": [
     "i <= rightmost",
     "i < rightmost",
     "i >= rightmost",
     "i == rightmost"
    ],
    "why": "不变量是「所有 <= rightmost 的位置都可达」，所以判断 i 是否可达要用 i <= rightmost（含等号，因为 rightmost 本身就是可达的边界点）；hints 明确写道 i <= rightmost 时才能更新，i > rightmost 时不可达不能用它更新。",
    "wrongWhy": {
     "i < rightmost": "漏掉等号会把 i == rightmost 这个本该可达的边界位置排除在外，导致明明可达的最远点无法用于继续扩展 rightmost，可能提前把可达链条掐断（尤其当 nums[rightmost] 才是唯一能继续前进的跳跃时）",
     "i >= rightmost": "方向反了，会让 i < rightmost（本该可达、可以正常更新）的大部分位置被跳过更新，只有 i 追上或超过 rightmost 才更新，逻辑完全错乱，rightmost 无法正确增长",
     "i == rightmost": "只在 i 恰好等于 rightmost 时才更新，会漏掉 i < rightmost 时同样可达、可能提供更大跳跃距离的中间位置，导致 rightmost 增长不充分，可能误判为不可达"
    }
   },
   {
    "id": "p55-rightmost-update-max",
    "crux": "更新 rightmost 时必须取 max，不能直接赋值覆盖，否则会让最远可达距离在遍历中变小",
    "answer": "max(rightmost, i + nums[i])",
    "blankOffset": 259,
    "blankLen": 27,
    "options": [
     "max(rightmost, i + nums[i])",
     "i + nums[i]",
     "max(rightmost, nums[i])",
     "min(rightmost, i + nums[i])"
    ],
    "why": "rightmost 表示「目前为止」的最远可达下标，是历史最大值，新位置 i 的跳跃可能比之前小，所以必须与旧的 rightmost 取较大者，才能保证 rightmost 单调不减；solutionText 中 rightmost 就是遍历过程中维护的最远下标。",
    "wrongWhy": {
     "i + nums[i]": "直接赋值会丢弃之前累积的更大 rightmost，若当前 i 的跳跃距离比历史最远值小，rightmost 会变小，破坏「rightmost 单调不减」的不变量，导致原本可达的位置被误判为不可达",
     "max(rightmost, nums[i])": "漏掉了当前下标 i 的偏移量，nums[i] 是从 i 出发能跳的步数，必须加上 i 才是能到达的绝对下标，直接用 nums[i] 会把可达距离算得远小于实际值",
     "min(rightmost, i + nums[i])": "取 min 会让 rightmost 只能变小或不变，一旦当前跳跃距离小于历史最远值就会把 rightmost 拉低，彻底破坏最远可达下标的语义，几乎必然导致误判为不可达"
    }
   },
   {
    "id": "p55-reach-check-ge-n-minus-1",
    "crux": "判断是否已能到达末尾时，比较目标是数组最后一个下标 n-1，且要用 >=（rightmost 可能远超 n-1）",
    "answer": "rightmost >= n - 1",
    "blankOffset": 308,
    "blankLen": 18,
    "options": [
     "rightmost >= n - 1",
     "rightmost > n - 1",
     "rightmost >= n",
     "rightmost == n - 1"
    ],
    "why": "数组最后一个下标是 n-1（n 是长度），目标是能到达下标 n-1 这个位置，所以条件是 rightmost >= n-1；用 >= 而非 == 是因为 rightmost 可能一步跨过甚至远超终点。",
    "wrongWhy": {
     "rightmost > n - 1": "漏掉了恰好到达终点（rightmost == n-1）这一常见情况，会导致明明已经可达末尾却继续遍历甚至误判为不可达",
     "rightmost >= n": "把目标下标错写成数组长度 n（不存在的下标），比正确终点多要求跳一步，会让本应判定为 true 的用例被漏判",
     "rightmost == n - 1": "去掉了大于的情况，一旦某步跳跃直接让 rightmost 超过 n-1（比如跳到 n+2），==判断会永远为 false，导致明明可达却返回 false"
    }
   },
   {
    "id": "p55-rightmost-init-zero",
    "crux": "rightmost 的初始值必须是 0（起点自身可达），不能是 nums[0] 或其他值",
    "answer": "0",
    "blankOffset": 116,
    "blankLen": 1,
    "options": [
     "0",
     "nums[0]",
     "-1",
     "n - 1"
    ],
    "why": "起点下标 0 本身总是可达的（数组非空时站在原地不动），所以 rightmost 的初始值应为 0，表示「目前已知可达的最远下标是 0」，之后遍历 i=0 时会用 nums[0] 去更新它。",
    "wrongWhy": {
     "nums[0]": "把初始最远下标错设为第一个元素的跳跃步数而非下标 0，若 nums[0] 较小会漏掉起点本身可达的信息，若较大则相当于提前偷跑更新，导致后续 i<=rightmost 判断从错误的基准开始",
     "-1": "会让 i=0 时的判断 0 <= -1 为假，导致起点自身都被误判为不可达，第一次循环就直接跳过更新，后续全部逻辑失效",
     "n - 1": "把终点当成初始的可达最远下标，会让算法在还没验证任何跳跃的情况下就提前判定为可达，对不可达的用例也会错误返回 true"
    }
   }
  ]
 },
 {
  "id": 56,
  "title": "56. 合并区间",
  "category": "普通数组",
  "difficulty": "medium",
  "descHtml": "<p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。请你合并所有重叠的区间，并返回&nbsp;<em>一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间</em>&nbsp;。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>intervals = [[1,3],[2,6],[8,10],[15,18]]\n<strong>输出：</strong>[[1,6],[8,10],[15,18]]\n<strong>解释：</strong>区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>intervals = [[1,4],[4,5]]\n<strong>输出：</strong>[[1,5]]\n<strong>解释：</strong>区间 [1,4] 和 [4,5] 可被视为重叠区间。</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<b>输入：</b>intervals = [[4,7],[1,4]]\n<b>输出：</b>[[1,7]]\n<b>解释：</b>区间 [1,4] 和 [4,7] 可被视为重叠区间。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>intervals[i].length == 2</code></li>\n\t<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.size() == 0) {\n            return {};\n        }\n        sort(intervals.begin(), intervals.end()); // 按左端点升序，可合并的区间必相邻\n        vector<vector<int>> merged;\n        for (int i = 0; i < intervals.size(); ++i) {\n            int L = intervals[i][0], R = intervals[i][1];\n            if (!merged.size() || merged.back()[1] < L) {\n                merged.push_back({L, R});\n            }\n            else {\n                merged.back()[1] = max(merged.back()[1], R); // 有重叠：右端点取较大者，处理区间包含\n            }\n        }\n        return merged;\n    }\n};",
  "cards": [
   {
    "id": "p56-merge-loop-bound",
    "crux": "遍历区间的循环边界，写错会越界或漏处理最后一个区间",
    "answer": "<",
    "blankOffset": 291,
    "blankLen": 1,
    "options": [
     "<",
     "<=",
     "< intervals.size() - 1"
    ],
    "why": "题解遍历排序后的每一个区间 [L,R]（hints第2条），下标范围是 0..size()-1，用严格小于 `<` 才能既覆盖最后一个区间又不越界访问 intervals[size()]。",
    "wrongWhy": {
     "<=": "当 i == intervals.size() 时会访问 intervals[i]，下标越界，触发未定义行为（可能崩溃或读到脏数据）。",
     "< intervals.size() - 1": "循环提前一次结束，最后一个区间永远不会被处理，导致结果漏掉最后一个（可能是待合并或独立的）区间。"
    }
   },
   {
    "id": "p56-merge-overlap-check",
    "crux": "判断当前区间是否与已合并区间重叠的比较符，等号取舍决定端点相邻时是否合并",
    "answer": "<",
    "blankOffset": 427,
    "blankLen": 1,
    "options": [
     "<",
     "<=",
     ">"
    ],
    "why": "solutionText 明确写道：\"若结果集为空或最后区间右端点小于 L，不重叠直接加入\"，即只有严格小于 L 才算不重叠；当 merged.back()[1] == L 时（如 [1,2] 和 [2,3]）端点相接，视为重叠需要合并，必须走 else 分支，所以判断不重叠要用严格的 `<`。",
    "wrongWhy": {
     "<=": "当 merged.back()[1] == L 时会被误判为不重叠而直接 push，导致本该合并的相邻区间（如 [1,2] 和 [2,3]）被错误地拆成两段输出。",
     ">": "条件语义完全颠倒，几乎所有真正重叠的区间都会被判成'不重叠'从而错误新建区间，合并逻辑基本失效。"
    }
   },
   {
    "id": "p56-merge-right-endpoint-max",
    "crux": "重叠时更新右端点必须取 max，直接覆盖会丢失被包含的区间信息",
    "answer": "max(merged.back()[1], R)",
    "blankOffset": 544,
    "blankLen": 24,
    "options": [
     "max(merged.back()[1], R)",
     "R",
     "max(merged.back()[1], L)"
    ],
    "why": "solutionText 特别指出易错点：\"[1,4] 包含 [2,3]，右端点必须取 max 而不能直接覆盖成 R\"，因为当前区间的右端点 R 可能比已合并区间的右端点更小（被完全包含），所以要取二者较大值才能保证合并后区间不变窄。",
    "wrongWhy": {
     "R": "直接把右端点覆盖成当前区间的 R，一旦遇到区间被完全包含的情况（如已合并区间是 [1,4]，当前区间是 [2,3]），会把右端点从 4 错误地缩小成 3，丢失被包含的那部分区间。",
     "max(merged.back()[1], L)": "参与比较的量选错了，应该是当前区间的右端点 R 而不是左端点 L；进入 else 分支时必有 L <= merged.back()[1]，所以 max(merged.back()[1], L) 恒等于原右端点，等价于什么都没做，无法正确扩展右边界。"
    }
   }
  ]
 },
 {
  "id": 62,
  "title": "62. 不同路径",
  "category": "多维动态规划",
  "difficulty": "medium",
  "descHtml": "<p>一个机器人位于一个 <code>m x n</code><em>&nbsp;</em>网格的左上角 （起始点在下图中标记为 “Start” ）。</p>\n\n<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。</p>\n\n<p>问总共有多少条不同的路径？</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 3, n = 7\n<strong>输出：</strong>28</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 3, n = 2\n<strong>输出：</strong>3\n<strong>解释：</strong>\n从左上角开始，总共有 3 条路径可以到达右下角。\n1. 向右 -&gt; 向下 -&gt; 向下\n2. 向下 -&gt; 向下 -&gt; 向右\n3. 向下 -&gt; 向右 -&gt; 向下\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 7, n = 3\n<strong>输出：</strong>28\n</pre>\n\n<p><strong>示例 4：</strong></p>\n\n<pre>\n<strong>输入：</strong>m = 3, n = 3\n<strong>输出：</strong>6</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li>题目数据保证答案小于等于 <code>2 * 10<sup>9</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<vector<int>> f(m, vector<int>(n)); // f[i][j]：走到 (i,j) 的路径数\n        for (int i = 0; i < m; ++i) {\n            f[i][0] = 1;\n        }\n        for (int j = 0; j < n; ++j) {\n            f[0][j] = 1;\n        }\n        for (int i = 1; i < m; ++i) {\n            for (int j = 1; j < n; ++j) {\n                f[i][j] = f[i - 1][j] + f[i][j - 1]; // 只能从上方或左方走来，方案数相加\n            }\n        }\n        return f[m - 1][n - 1];\n    }\n};",
  "cards": [
   {
    "id": "p62-inner-loop-start-from-1",
    "crux": "内部双重循环必须从 i=1、j=1 开始，因为第 0 行/第 0 列已单独初始化为边界，从 1 开始才不会覆盖边界值",
    "answer": "for (int i = 1; i < m; ++i) {",
    "blankOffset": 290,
    "blankLen": 29,
    "options": [
     "for (int i = 1; i < m; ++i) {",
     "for (int i = 0; i < m; ++i) {",
     "for (int i = 1; i <= m; ++i) {"
    ],
    "why": "题解已经把 f[i][0]（第一列）和 f[0][j]（第一行）单独填成 1，代表只有一条直路；内部转移循环必须从 i=1、j=1 开始，跳过已经处理好的边界行/列，只填内部格子。",
    "wrongWhy": {
     "for (int i = 0; i < m; ++i) {": "i=0 时会执行 f[0][j] = f[-1][j] + f[0][j-1]，访问 f[-1][j] 是数组越界（未定义行为），且会把之前正确初始化的第一行边界值覆盖成错误结果。",
     "for (int i = 1; i <= m; ++i) {": "i 会取到 m，导致 f[m][j] 越界访问（vector 大小只有 m 行，合法下标是 0..m-1），运行时越界崩溃或读到脏内存。"
    }
   },
   {
    "id": "p62-transition-add-up-and-left",
    "crux": "状态转移必须是「上方 + 左方」两个来源相加，不能写成相减或写成对角线来源",
    "answer": "f[i][j] = f[i - 1][j] + f[i][j - 1];",
    "blankOffset": 378,
    "blankLen": 36,
    "options": [
     "f[i][j] = f[i - 1][j] + f[i][j - 1];",
     "f[i][j] = f[i - 1][j - 1] + f[i][j - 1];",
     "f[i][j] = f[i - 1][j] - f[i][j - 1];"
    ],
    "why": "机器人每次只能向下或向右走一步，所以走到 (i,j) 的方案数等于从上方 (i-1,j) 走来的方案数加上从左方 (i,j-1) 走来的方案数，两者相加即为总方案数。",
    "wrongWhy": {
     "f[i][j] = f[i - 1][j - 1] + f[i][j - 1];": "f[i-1][j-1] 是左上角对角格，走到它需要两步（既非纯下也非纯右），不是合法的单步来源，会算出错误的路径数（这是路径计数问题而非编辑距离，不应引入对角线转移）。",
     "f[i][j] = f[i - 1][j] - f[i][j - 1];": "把两条独立路径的方案数相减没有任何组合意义，路径数应该是并集相加而不是相减，结果会得到错误甚至负数的路径计数。"
    }
   },
   {
    "id": "p62-return-index-minus-one",
    "crux": "返回值下标必须是 m-1、n-1，因为 f 数组下标从 0 开始，(m-1,n-1) 才是右下角终点格",
    "answer": "return f[m - 1][n - 1];",
    "blankOffset": 467,
    "blankLen": 23,
    "options": [
     "return f[m - 1][n - 1];",
     "return f[m][n];",
     "return f[m - 1][n];"
    ],
    "why": "f 是 m 行 n 列的表，行列下标范围都是 0 到 m-1/0 到 n-1，网格右下角终点对应下标 (m-1, n-1)，所以最终答案要取 f[m-1][n-1]。",
    "wrongWhy": {
     "return f[m][n];": "f 的合法下标最大只到 (m-1, n-1)，f[m][n] 会越界访问（vector 越界是未定义行为），不是终点格。",
     "return f[m - 1][n];": "列下标少减了 1，n 超出了该行的合法列范围（0..n-1），既越界又不是终点格，取到的不是终点的路径数。"
    }
   }
  ]
 },
 {
  "id": 64,
  "title": "64. 最小路径和",
  "category": "多维动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给定一个包含非负整数的 <code><em>m</em>&nbsp;x&nbsp;<em>n</em></code>&nbsp;网格&nbsp;<code>grid</code> ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。</p>\n\n<p><strong>说明：</strong>每次只能向下或者向右移动一步。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[1,3,1],[1,5,1],[4,2,1]]\n<strong>输出：</strong>7\n<strong>解释：</strong>因为路径 1→3→1→1→1 的总和最小。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[1,2,3],[4,5,6]]\n<strong>输出：</strong>12\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>0 &lt;= grid[i][j] &lt;= 200</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        if (grid.size() == 0 || grid[0].size() == 0) {\n            return 0;\n        }\n        int rows = grid.size(), columns = grid[0].size();\n        auto dp = vector<vector<int>>(rows, vector<int>(columns)); // dp[i][j]：走到 (i,j) 的最小路径和\n        dp[0][0] = grid[0][0];\n        for (int i = 1; i < rows; i++) {\n            dp[i][0] = dp[i - 1][0] + grid[i][0];\n        }\n        for (int j = 1; j < columns; j++) {\n            dp[0][j] = dp[0][j - 1] + grid[0][j];\n        }\n        for (int i = 1; i < rows; i++) {\n            for (int j = 1; j < columns; j++) {\n                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]; // 取上、左更小的一条路\n            }\n        }\n        return dp[rows - 1][columns - 1];\n    }\n};",
  "cards": [
   {
    "id": "p64-min-path-sum-return-index",
    "crux": "最终返回的下标必须是 rows-1、columns-1（数组最后一个合法下标），写成 rows/columns 会越界",
    "answer": "dp[rows - 1][columns - 1]",
    "blankOffset": 764,
    "blankLen": 25,
    "options": [
     "dp[rows - 1][columns - 1]",
     "dp[rows][columns]",
     "dp[rows - 1][columns]",
     "dp[columns - 1][rows - 1]"
    ],
    "why": "dp 数组大小是 rows 行 columns 列，下标范围是 0..rows-1 和 0..columns-1，右下角格子对应最后一个下标 rows-1、columns-1，这正是 solutionText 中『答案在右下角 dp[rows-1][columns-1]』所指的位置。",
    "wrongWhy": {
     "dp[rows][columns]": "rows、columns 是行列的总数（size()），直接当下标用会越界访问 vector，行为未定义或抛异常。",
     "dp[rows - 1][columns]": "列下标少减了 1，仍然越界访问 dp[i][columns]，读到非法内存或抛异常。",
     "dp[columns - 1][rows - 1]": "行列下标写反，当 grid 不是正方形（rows≠columns）时会越界或取到错误格子的值。"
    }
   },
   {
    "id": "p64-min-path-sum-transition-min",
    "crux": "内部转移取的是『上方 dp[i-1][j]』和『左方 dp[i][j-1]』两个来源的较小值，不是对角线，也不是取较大值",
    "answer": "min(dp[i - 1][j], dp[i][j - 1])",
    "blankOffset": 665,
    "blankLen": 31,
    "options": [
     "min(dp[i - 1][j], dp[i][j - 1])",
     "min(dp[i - 1][j - 1], dp[i][j - 1])",
     "max(dp[i - 1][j], dp[i][j - 1])",
     "min(dp[i - 1][j], dp[i - 1][j - 1])"
    ],
    "why": "走到 (i,j) 只能从正上方 (i-1,j) 或正左方 (i,j-1) 走来，所以要在这两个已知最优解里取路径和更小的那个，再加上当前格子的 grid[i][j]，这正是注释『取上、左更小的一条路』强调的两个来源。",
    "wrongWhy": {
     "min(dp[i - 1][j - 1], dp[i][j - 1])": "对角线格子 (i-1,j-1) 根本不能一步走到 (i,j)（每步只能向右或向下），用它参与转移会得到偏小甚至错误的路径和。",
     "max(dp[i - 1][j], dp[i][j - 1])": "题目要求最小路径和，取 max 会选到更差的那条路，结果偏大，整体答案错误。",
     "min(dp[i - 1][j], dp[i - 1][j - 1])": "把左方来源错写成左上角对角线，遗漏了真正的『左方 dp[i][j-1]』，会漏掉一部分有效路径。"
    }
   },
   {
    "id": "p64-min-path-sum-first-col-init",
    "crux": "第一列的初始化必须累加『上一行第一列的 dp 值 + 当前格子的 grid 值』，而不是重复用同一行的 grid",
    "answer": "dp[i - 1][0] + grid[i][0]",
    "blankOffset": 408,
    "blankLen": 25,
    "options": [
     "dp[i - 1][0] + grid[i][0]",
     "dp[i - 1][0] + grid[i - 1][0]",
     "dp[i][0] + grid[i][0]",
     "dp[i - 1][1] + grid[i][0]"
    ],
    "why": "第一列每个格子只能从正上方走下来（没有左方来源），所以要在『上一行同列已经算好的最小路径和 dp[i-1][0]』基础上，加上『当前格子自身的代价 grid[i][0]』，这就是 solutionText 所说『第一列只能从上来，必须沿边累加』。",
    "wrongWhy": {
     "dp[i - 1][0] + grid[i - 1][0]": "grid 的行下标错用了 i-1：dp[i-1][0] 里已经含有 grid[i-1][0]，再加一次等于把上一行格子代价计两遍、又漏掉了当前格子 grid[i][0]，结果错误。",
     "dp[i][0] + grid[i][0]": "dp[i][0] 就是本次要求解的目标值，用它加自身赋值给自己会导致初始化逻辑失效（用未定义的当前值参与计算）。",
     "dp[i - 1][1] + grid[i][0]": "误用了第二列的 dp 值作为来源，破坏了『第一列只能从上方同列走来』的边界约束，得到错误结果。"
    }
   },
   {
    "id": "p64-min-path-sum-first-col-loop-start",
    "crux": "第一列初始化循环必须从 i=1 开始，因为 dp[0][0] 已单独赋值，从 0 开始会越界访问 dp[-1][0]",
    "answer": "int i = 1",
    "blankOffset": 357,
    "blankLen": 9,
    "options": [
     "int i = 1",
     "int i = 0",
     "int i = 2"
    ],
    "why": "dp[0][0] 在此循环之前已经单独赋值为 grid[0][0]，所以第一列的累加循环只需要从第二行（下标 1）开始往下走；如果从 0 开始，i-1 就是 -1，访问 dp[-1][0] 会越界。",
    "wrongWhy": {
     "int i = 0": "此时 i-1 为 -1，dp[i - 1][0] 访问越界的负下标，行为未定义，同时会覆盖掉已经正确设置的 dp[0][0]。",
     "int i = 2": "跳过了 i=1 这一行，dp[1][0] 永远不会被赋值，后续用到它时是未初始化的垃圾值，导致结果错误。"
    }
   }
  ]
 },
 {
  "id": 70,
  "title": "70. 爬楼梯",
  "category": "动态规划",
  "difficulty": "easy",
  "descHtml": "<p>假设你正在爬楼梯。需要 <code>n</code>&nbsp;阶你才能到达楼顶。</p>\n\n<p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 2\n<strong>输出：</strong>2\n<strong>解释：</strong>有两种方法可以爬到楼顶。\n1. 1 阶 + 1 阶\n2. 2 阶</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = 3\n<strong>输出：</strong>3\n<strong>解释：</strong>有三种方法可以爬到楼顶。\n1. 1 阶 + 1 阶 + 1 阶\n2. 1 阶 + 2 阶\n3. 2 阶 + 1 阶\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 45</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int climbStairs(int n) {\n        int p = 0, q = 0, r = 1;\n        for (int i = 1; i <= n; ++i) {\n            p = q;\n            q = r;\n            r = p + q; // 滚动递推：f(i) = f(i-1) + f(i-2)\n        }\n        return r;\n    }\n};",
  "cards": [
   {
    "id": "p70-climb-stairs-base-r-init-1",
    "crux": "滚动变量 r 的初始值必须是 1（对应 f(0)=1 的边界），不能初始化成 0",
    "answer": "1",
    "blankOffset": 84,
    "blankLen": 1,
    "options": [
     "1",
     "0"
    ],
    "why": "题解明确边界 f(0)=1、f(1)=1，r 承载的是「上一步的 f 值」这一滚动位，循环开始前必须先把 f(0)=1 放进去；否则即便循环次数正确，每一步递推出的值都会整体偏小。",
    "wrongWhy": {
     "0": "把基准值设成 0 会破坏 f(0)=1 这一边界：n=0 时直接返回 0（应为 1），n=1 时循环一次后 r 仍算成 0（应为 1），后续所有 n 的结果都跟着整体少 1。"
    }
   },
   {
    "id": "p70-climb-stairs-loop-bound-le-n",
    "crux": "循环条件必须是 i <= n（执行恰好 n 次递推），写成 i < n 会少推一次导致结果偏小",
    "answer": "i <= n",
    "blankOffset": 111,
    "blankLen": 6,
    "options": [
     "i <= n",
     "i < n"
    ],
    "why": "题解讲解写明「循环 n 次后 r 即答案」，要让 r 从 f(0)/f(1) 起步递推到 f(n)，循环体必须恰好执行 n 次，因此终止条件要用 i <= n（i 从 1 到 n 共 n 次）。",
    "wrongWhy": {
     "i < n": "会让循环只执行 n-1 次，相当于提前一步返回；例如 n=2 时只跑 1 次，r 停在 f(1)=1 而不是正确答案 2。"
    }
   },
   {
    "id": "p70-climb-stairs-roll-order-q-eq-r",
    "crux": "三行滚动赋值中间那句必须是 q = r（把上一轮的 r 滚动到 q），顺序或写错都会丢失 f(i-1) 的值",
    "answer": "q = r;",
    "blankOffset": 157,
    "blankLen": 6,
    "options": [
     "q = r;",
     "r = q;",
     "q = p;"
    ],
    "why": "提示里写明依次执行 p=q; q=r; r=p+q; 这三步，本质是把 p、q 各往前滚一位（p 拿走旧 q 也就是 f(i-2)，q 拿走旧 r 也就是 f(i-1)），最后一行才能用新的 p+q 算出 f(i)=f(i-1)+f(i-2)；顺序或对象错了就取不到正确的前两项。",
    "wrongWhy": {
     "r = q;": "这一步本该是 q = r（把旧 r=f(i-1) 滚进 q）。写成 r = q 时，前一行 p=q 只更新了 p、并没有动 q，所以 q 仍是旧 q=f(i-2)；此句却把 r 覆盖成这个旧 q，于是 f(i-1) 彻底丢失、q 也没能前进。最后一行 r=p+q 退化成 f(i-2)+f(i-2)，少算了 f(i-1) 这一项，结果偏小。",
     "q = p;": "q 会被重新赋成刚更新的 p（即原来的 q 本身），旧的 r（也就是 f(i-1)）根本没被滚动进 q，最后一行 r=p+q 少加了 f(i-1) 这一项，得到的结果比正确值小。"
    }
   }
  ]
 },
 {
  "id": 72,
  "title": "72. 编辑距离",
  "category": "多维动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你两个单词&nbsp;<code>word1</code> 和&nbsp;<code>word2</code>， <em>请返回将&nbsp;<code>word1</code>&nbsp;转换成&nbsp;<code>word2</code> 所使用的最少操作数</em> &nbsp;。</p>\n\n<p>你可以对一个单词进行如下三种操作：</p>\n\n<ul>\n\t<li>插入一个字符</li>\n\t<li>删除一个字符</li>\n\t<li>替换一个字符</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>word1 = \"horse\", word2 = \"ros\"\n<strong>输出：</strong>3\n<strong>解释：</strong>\nhorse -&gt; rorse (将 'h' 替换为 'r')\nrorse -&gt; rose (删除 'r')\nrose -&gt; ros (删除 'e')\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>word1 = \"intention\", word2 = \"execution\"\n<strong>输出：</strong>5\n<strong>解释：</strong>\nintention -&gt; inention (删除 't')\ninention -&gt; enention (将 'i' 替换为 'e')\nenention -&gt; exention (将 'n' 替换为 'x')\nexention -&gt; exection (将 'n' 替换为 'c')\nexection -&gt; execution (插入 'u')\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li>\n\t<li><code>word1</code> 和 <code>word2</code> 由小写英文字母组成</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int n = word1.length();\n        int m = word2.length();\n\n        // 有一个字符串为空串\n        if (n * m == 0) return n + m;\n\n        // D[i][j]：word1 前 i 个字符变为 word2 前 j 个字符的最少操作数\n        vector<vector<int>> D(n + 1, vector<int>(m + 1));\n\n        // 边界状态初始化\n        for (int i = 0; i < n + 1; i++) {\n            D[i][0] = i;\n        }\n        for (int j = 0; j < m + 1; j++) {\n            D[0][j] = j;\n        }\n\n        // 计算所有 DP 值\n        for (int i = 1; i < n + 1; i++) {\n            for (int j = 1; j < m + 1; j++) {\n                int left = D[i - 1][j] + 1;\n                int down = D[i][j - 1] + 1;\n                int left_down = D[i - 1][j - 1];\n                if (word1[i - 1] != word2[j - 1]) left_down += 1;\n                D[i][j] = min(left, min(down, left_down)); // 删、插、改三种操作取最小\n            }\n        }\n        return D[n][m];\n    }\n};",
  "cards": [
   {
    "id": "p72-edit-distance-boundary-init-value",
    "crux": "D[i][0] 边界初始化的值必须是 i 本身（表示全部删除 i 次）",
    "answer": "D[i][0] = i;",
    "blankOffset": 387,
    "blankLen": 12,
    "options": [
     "D[i][0] = i;",
     "D[i][0] = i - 1;",
     "D[i][0] = 1;",
     "D[i][0] = 0;"
    ],
    "why": "D[i][0] 表示 word1 前 i 个字符变成空串所需的最少操作数，只能全部删除，所以恰好需要 i 次操作，边界值必须等于 i。",
    "wrongWhy": {
     "D[i][0] = i - 1;": "少算了一次删除操作，会使所有依赖该边界的 DP 值整体偏小 1，尤其 i=0 时变成 -1，直接出错。",
     "D[i][0] = 1;": "把边界值写死成常量 1，丢失了随 i 增长的线性关系，只有 i=1 时恰好正确，其余全错。",
     "D[i][0] = 0;": "意味着 word1 前 i 个字符不需要任何操作就能变成空串，这在 i>0 时明显不成立，会让后续所有 DP 值都比正确答案小。"
    }
   },
   {
    "id": "p72-edit-distance-mismatch-condition",
    "crux": "只有末尾字符「不同」时才需要给替换操作 +1，等号方向不能反",
    "answer": "if (word1[i - 1] != word2[j - 1]) left_down += 1;",
    "blankOffset": 750,
    "blankLen": 49,
    "options": [
     "if (word1[i - 1] != word2[j - 1]) left_down += 1;",
     "if (word1[i - 1] == word2[j - 1]) left_down += 1;",
     "if (word1[i - 1] >= word2[j - 1]) left_down += 1;",
     "if (word1[i - 1] <= word2[j - 1]) left_down += 1;"
    ],
    "why": "替换操作只在两个末尾字符不相同时才需要花费一次代价；如果字符相同，直接继承 D[i-1][j-1] 不加代价即可，所以条件必须是 !=。",
    "wrongWhy": {
     "if (word1[i - 1] == word2[j - 1]) left_down += 1;": "等号方向反了，字符相同时反而加了不必要的替换代价，字符不同时却漏加，整个替换分支逻辑完全颠倒。",
     "if (word1[i - 1] >= word2[j - 1]) left_down += 1;": "对 char 做大小比较没有语义意义，会随机地对某些不相等的字符对不加代价、对相等字符对加代价，结果完全错误。",
     "if (word1[i - 1] <= word2[j - 1]) left_down += 1;": "同样是无意义的大小比较，会导致相同字符也被误判为需要替换，或不同字符被误判为无需替换。"
    }
   },
   {
    "id": "p72-edit-distance-index-offset",
    "crux": "DP 下标 i（表示前 i 个字符）取字符串字符时要用 i - 1（0-based）",
    "answer": "word1[i - 1]",
    "blankOffset": 754,
    "blankLen": 12,
    "options": [
     "word1[i - 1]",
     "word1[i]",
     "word1[i + 1]",
     "word2[i - 1]"
    ],
    "why": "D[i][j] 中的 i 表示 word1 的前 i 个字符（1-based 计数），而 C++ 字符串下标是 0-based，所以第 i 个字符对应下标 i-1。",
    "wrongWhy": {
     "word1[i]": "多取了一位，比较的字符整体错位（本该比较第 i 个字符 word1[i-1]，却比较了 word1[i]）；当 i=n 时更读到了字符串末尾之外的位置，结果必错。",
     "word1[i + 1]": "偏移更严重，i 较大时直接越界访问未定义内存，程序行为未定义。",
     "word2[i - 1]": "用错了字符串变量，拿 i（word1 的计数）去索引 word2 而不是 word1，会把两个字符串的字符错误地混用比较。"
    }
   },
   {
    "id": "p72-edit-distance-empty-string-shortcut",
    "crux": "有一个字符串为空时，编辑距离直接等于另一个串的长度 n + m",
    "answer": "if (n * m == 0) return n + m;",
    "blankOffset": 169,
    "blankLen": 29,
    "options": [
     "if (n * m == 0) return n + m;",
     "if (n * m == 0) return 0;",
     "if (n * m == 0) return n;",
     "if (n * m == 0) return m;"
    ],
    "why": "n*m==0 说明 word1 和 word2 至少有一个是空串，此时必有 n=0 或 m=0，所以 n+m 恰好等于非空那个串的长度，也就是把它全部插入或全部删除所需的操作数。",
    "wrongWhy": {
     "if (n * m == 0) return 0;": "误以为空串和另一个串天然相等，忽略了还需要若干次插入/删除操作才能变成目标串，非空串长度大于 0 时结果必错。",
     "if (n * m == 0) return n;": "只在 m=0（word2 为空）时碰巧正确，若是 n=0 而 m>0，正确答案应为 m，返回 n=0 会算错。",
     "if (n * m == 0) return m;": "同理只在 n=0 时碰巧正确，若是 m=0 而 n>0，应返回 n，返回 m=0 会算错。"
    }
   }
  ]
 },
 {
  "id": 73,
  "title": "73. 矩阵置零",
  "category": "矩阵",
  "difficulty": "medium",
  "descHtml": "<p>给定一个&nbsp;<code><em>m</em> x <em>n</em></code> 的矩阵，如果一个元素为 <strong>0 </strong>，则将其所在行和列的所有元素都设为 <strong>0</strong> 。请使用 <strong><a href=\"http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\">原地</a></strong> 算法<strong>。</strong></p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,1,1],[1,0,1],[1,1,1]]\n<strong>输出：</strong>[[1,0,1],[0,0,0],[1,0,1]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\n<strong>输出：</strong>[[0,0,0,0],[0,4,5,0],[0,3,1,0]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[0].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 200</code></li>\n\t<li><code>-2<sup>31</sup> &lt;= matrix[i][j] &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>一个直观的解决方案是使用 &nbsp;<code>O(<em>m</em><em>n</em>)</code>&nbsp;的额外空间，但这并不是一个好的解决方案。</li>\n\t<li>一个简单的改进方案是使用 <code>O(<em>m</em>&nbsp;+&nbsp;<em>n</em>)</code> 的额外空间，但这仍然不是最好的解决方案。</li>\n\t<li>你能想出一个仅使用常量空间的解决方案吗？</li>\n</ul>",
  "code": "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m = matrix.size();\n        int n = matrix[0].size();\n        int flag_col0 = false, flag_row0 = false; // 先记录第一列 / 第一行自身是否含 0\n        for (int i = 0; i < m; i++) {\n            if (!matrix[i][0]) {\n                flag_col0 = true;\n            }\n        }\n        for (int j = 0; j < n; j++) {\n            if (!matrix[0][j]) {\n                flag_row0 = true;\n            }\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (!matrix[i][j]) {\n                    matrix[i][0] = matrix[0][j] = 0; // 用首行首列作为该行该列需置零的标记\n                }\n            }\n        }\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                if (!matrix[i][0] || !matrix[0][j]) {\n                    matrix[i][j] = 0;\n                }\n            }\n        }\n        if (flag_col0) {\n            for (int i = 0; i < m; i++) {\n                matrix[i][0] = 0;\n            }\n        }\n        if (flag_row0) {\n            for (int j = 0; j < n; j++) {\n                matrix[0][j] = 0;\n            }\n        }\n    }\n};",
  "cards": [
   {
    "id": "p73-flag-init-false",
    "crux": "flag_col0/flag_row0 必须初始化为 false，等待后续扫描后才置为 true",
    "answer": "false",
    "blankOffset": 164,
    "blankLen": 5,
    "options": [
     "false",
     "true"
    ],
    "why": "flag_col0/flag_row0 用来记录第一列/第一行『自身』最初是否含 0，必须先假设不含 0（false），再通过扫描第一列/第一行来确认是否需要改为 true；这样最后才能依据它是否被置 true 来决定是否清零第一行/第一列。",
    "wrongWhy": {
     "true": "初始化为 true 会让最后 if (flag_col0) / if (flag_row0) 恒为真，导致即使原矩阵第一行/第一列根本不含 0，也会被错误地整行/整列清零。"
    }
   },
   {
    "id": "p73-row-col-flag-or-condition",
    "crux": "依据标记清零内部元素时，行标记和列标记之间必须是『或』的关系，而非『且』",
    "answer": "||",
    "blankOffset": 818,
    "blankLen": 2,
    "options": [
     "||",
     "&&"
    ],
    "why": "只要该元素所在行的标记 matrix[i][0] 为 0，或者所在列的标记 matrix[0][j] 为 0，就说明这一行或这一列上原本存在 0，该元素就应被置零，两者是『任一满足即可』的逻辑或关系。",
    "wrongWhy": {
     "&&": "改成 && 后只有当该行和该列同时被标记为需要置零时才会清零，会漏掉『仅该行含0但该列不含0』或『仅该列含0但该行不含0』的元素，导致本该置零的位置没有被清零。"
    }
   }
  ]
 },
 {
  "id": 74,
  "title": "74. 搜索二维矩阵",
  "category": "二分查找",
  "difficulty": "medium",
  "descHtml": "<p>给你一个满足下述两条属性的 <code>m x n</code> 整数矩阵：</p>\n\n<ul>\n\t<li>每行中的整数从左到右按非严格递增顺序排列。</li>\n\t<li>每行的第一个整数大于前一行的最后一个整数。</li>\n</ul>\n\n<p>给你一个整数 <code>target</code> ，如果 <code>target</code> 在矩阵中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 100</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= matrix[i][j], target &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int low = 0, high = m * n - 1;\n        while (low <= high) {\n            int mid = (high - low) / 2 + low;\n            int x = matrix[mid / n][mid % n]; // 一维下标映射回二维：除/模的都是列数 n\n            if (x < target) {\n                low = mid + 1;\n            } else if (x > target) {\n                high = mid - 1;\n            } else {\n                return true;\n            }\n        }\n        return false;\n    }\n};",
  "cards": [
   {
    "id": "p74-loop-condition-le",
    "crux": "闭区间二分循环条件必须是 low <= high",
    "answer": "while (low <= high) {",
    "blankOffset": 190,
    "blankLen": 21,
    "options": [
     "while (low <= high) {",
     "while (low < high) {",
     "while (low <= high - 1) {"
    ],
    "why": "low、high 表示的是闭区间 [low, high]，当 low == high 时区间里还有一个元素（即 mid 本身）需要被检查，所以循环条件必须包含等号，写成 low <= high，退出时才代表区间为空、确定没找到。",
    "wrongWhy": {
     "while (low < high) {": "当 low == high 时区间还剩最后一个元素未被检查就直接退出循环，会漏掉这个下标对应的值，导致本该返回 true 的情况错误地返回 false。",
     "while (low <= high - 1) {": "等价于 low < high，同样会在 low == high 时提前退出，漏检最后一个候选元素。"
    }
   },
   {
    "id": "p74-row-col-mapping-n",
    "crux": "一维 mid 映射回二维时除和取模都要用列数 n，不能用行数 m",
    "answer": "matrix[mid / n][mid % n]",
    "blankOffset": 278,
    "blankLen": 24,
    "options": [
     "matrix[mid / n][mid % n]",
     "matrix[mid / m][mid % m]",
     "matrix[mid % n][mid / n]"
    ],
    "why": "矩阵按行展平后，每一行有 n 个元素，所以一维下标 mid 除以每行长度 n 得到行号，对 n 取模得到列号；用行数 m 或把除/模位置颠倒都会打乱行列对应关系，取到错误元素。",
    "wrongWhy": {
     "matrix[mid / m][mid % m]": "误把每行长度当成行数 m，只有 m == n（方阵）时碰巧不出错，行数列数不等的矩阵会直接越界或取到错误位置的元素。",
     "matrix[mid % n][mid / n]": "把行号和列号的计算方式互换，取模结果当行号、整除结果当列号，除非矩阵是方阵，否则取到的元素与目标下标完全不对应。"
    }
   },
   {
    "id": "p74-low-update-mid-plus-1",
    "crux": "x < target 时收缩区间要 low = mid + 1，不能等于 mid",
    "answer": "low = mid + 1;",
    "blankOffset": 374,
    "blankLen": 14,
    "options": [
     "low = mid + 1;",
     "low = mid;",
     "low = mid - 1;"
    ],
    "why": "已知 matrix[mid/n][mid%n] 小于 target，说明 mid 这个位置不可能是答案，可以排除，所以新的搜索区间应从 mid+1 开始；若写成 low = mid 会把已排除的 mid 重新纳入区间，可能导致死循环。",
    "wrongWhy": {
     "low = mid;": "mid 已经被判定小于 target 排除掉了，仍保留在区间内，当 low 恰好等于 high 时会造成 low、high 不再变化，陷入死循环。",
     "low = mid - 1;": "方向反了：应把 low 前移到 mid+1 排除掉 mid，写成 low = mid - 1 反而把 low 往左退，已排除的元素重新回到区间，low 永远越不过 mid，区间不收缩而陷入死循环（不是漏检——目标本身并未被排除在区间外）。"
    }
   },
   {
    "id": "p74-high-update-mid-minus-1",
    "crux": "x > target 时收缩区间要 high = mid - 1，不能等于 mid",
    "answer": "high = mid - 1;",
    "blankOffset": 442,
    "blankLen": 15,
    "options": [
     "high = mid - 1;",
     "high = mid;",
     "high = mid + 1;"
    ],
    "why": "已知 matrix[mid/n][mid%n] 大于 target，说明 mid 这个位置不可能是答案，应从区间中排除，新的搜索区间上界应设为 mid-1；若写成 high = mid 会把已排除的 mid 保留在区间中，可能导致死循环。",
    "wrongWhy": {
     "high = mid;": "mid 已经被判定大于 target 排除掉了，仍保留在区间内，当 low 恰好等于 high 时会造成区间不再收缩，陷入死循环。",
     "high = mid + 1;": "方向反了：应把 high 前移到 mid-1 排除掉 mid，写成 high = mid + 1 反而把上界往右扩，已排除的元素重新进入区间，当 mid 等于原上界时 high 甚至会越过 m*n-1，造成越界访问。"
    }
   }
  ]
 },
 {
  "id": 75,
  "title": "75. 颜色分类",
  "category": "技巧",
  "difficulty": "medium",
  "descHtml": "<p>给定一个包含红色、白色和蓝色、共&nbsp;<code>n</code><em> </em>个元素的数组&nbsp;<code>nums</code>&nbsp;，<strong><a href=\"https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95\" target=\"_blank\">原地</a>&nbsp;</strong>对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。</p>\n\n<p>我们使用整数 <code>0</code>、&nbsp;<code>1</code> 和 <code>2</code> 分别表示红色、白色和蓝色。</p>\n\n<ul>\n</ul>\n\n<p>必须在不使用库内置的 sort 函数的情况下解决这个问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,0,2,1,1,0]\n<strong>输出：</strong>[0,0,1,1,2,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,0,1]\n<strong>输出：</strong>[0,1,2]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 300</code></li>\n\t<li><code>nums[i]</code> 为 <code>0</code>、<code>1</code> 或 <code>2</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>你能想出一个仅使用常数空间的一趟扫描算法吗？</li>\n</ul>",
  "code": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int n = nums.size();\n        int p0 = 0, p2 = n - 1; // 不变量：[0,p0) 全为 0，(p2,n-1] 全为 2\n        for (int i = 0; i <= p2; ++i) {\n            while (i <= p2 && nums[i] == 2) { // 换回来的可能还是 2，必须继续换\n                swap(nums[i], nums[p2]);\n                --p2;\n            }\n            if (nums[i] == 0) {\n                swap(nums[i], nums[p0]);\n                ++p0;\n            }\n        }\n    }\n};",
  "cards": [
   {
    "id": "p75-p2-pointer-init",
    "crux": "p2 初始值必须是 n - 1（最后一个合法下标），不是 n",
    "answer": "n - 1",
    "blankOffset": 120,
    "blankLen": 5,
    "options": [
     "n - 1",
     "n",
     "n - 2",
     "0"
    ],
    "why": "题解的不变量是 (p2, n-1] 全为 2，初始时这个区间还没有任何已确认的 2，必须为空区间，所以 p2 要指向数组最后一个合法下标 n-1，才能让初始区间为空。",
    "wrongWhy": {
     "0": "让“2 区”从数组开头开始，p0/p2/i 三个指针的相对位置完全错位，双指针逻辑失效，2 无法被正确交换到末尾。",
     "n": "n 是数组长度，不是合法下标（合法下标最大是 n-1），后续 swap(nums[i], nums[p2]) 会访问 nums[n]，造成越界读写。",
     "n - 2": "让 (p2, n-1] 初始就包含最后一个元素，相当于还没扫描就把它当成已确认的 2；如果它实际不是 2，就永远不会被处理，结果错误。"
    }
   },
   {
    "id": "p75-outer-loop-bound-i-lte-p2",
    "crux": "外层循环条件必须是 i <= p2（含 p2 本身），不能是 i < p2 或 i <= n",
    "answer": "i <= p2",
    "blankOffset": 184,
    "blankLen": 7,
    "options": [
     "i <= p2",
     "i < p2",
     "i <= n"
    ],
    "why": "hints 中明确说“循环条件是 i <= p2，越过 p2 就结束”，i 需要扫描到 p2 这个位置本身；一旦 i 越过 p2 说明中间区域全部处理完毕才能停止。",
    "wrongWhy": {
     "i < p2": "当 i 恰好等于 p2 时循环体不会再执行一次，下标为 p2 的这个元素永远不会被检查和归位，可能把一个 0 或未处理的值遗留在数组中间，排序不完整。",
     "i <= n": "n 是越界下标；当 p2 已经缩小（甚至变为负数）之后循环仍会让 i 一路跑到 n，导致 nums[i] 访问越界（合法下标最大只能是 n-1）。"
    }
   },
   {
    "id": "p75-swap-then-decrement-p2-order",
    "crux": "遇到 2 时必须先 swap(nums[i], nums[p2])，再 --p2，顺序不能颠倒",
    "answer": "swap(nums[i], nums[p2]);\n                --p2;",
    "blankOffset": 282,
    "blankLen": 46,
    "options": [
     "swap(nums[i], nums[p2]);\n                --p2;",
     "--p2;\n                swap(nums[i], nums[p2]);"
    ],
    "why": "题解讲的是“遇到 2 时与 nums[p2] 交换并左移 p2”——必须先用当前 p2 指向的位置完成交换，再让 p2 左移一位，这样每次交换的才是“还未检查过”的那个 p2 位置的元素。",
    "wrongWhy": {
     "--p2;\n                swap(nums[i], nums[p2]);": "先减 p2 再交换，实际参与交换的是新的（原 p2-1 位置）元素，原本 p2 位置上的元素被直接跳过、从未被检验，可能导致一个 2 残留在数组中间，排序结果错误。"
    }
   },
   {
    "id": "p75-swap-then-increment-p0-order",
    "crux": "遇到 0 时必须先 swap(nums[i], nums[p0])，再 ++p0，顺序不能颠倒",
    "answer": "swap(nums[i], nums[p0]);\n                ++p0;",
    "blankOffset": 391,
    "blankLen": 46,
    "options": [
     "swap(nums[i], nums[p0]);\n                ++p0;",
     "++p0;\n                swap(nums[i], nums[p0]);"
    ],
    "why": "题解讲的是“遇到 0 时与 nums[p0] 交换并右移 p0”，必须先用当前 p0 指向的位置完成交换，把确认的 0 放到 p0 原来的位置，再让 p0 右移一位。",
    "wrongWhy": {
     "++p0;\n                swap(nums[i], nums[p0]);": "先加 p0 再交换，交换目标发生错位；当 i 恰好等于新的 p0 时相当于自己和自己交换、什么都没发生，本应移到前面的 0 永远留在原地，排序结果错误。"
    }
   }
  ]
 },
 {
  "id": 76,
  "title": "76. 最小覆盖子串",
  "category": "子串",
  "difficulty": "hard",
  "descHtml": "<p>给定两个字符串&nbsp;<code>s</code> 和&nbsp;<code>t</code>，长度分别是&nbsp;<code>m</code> 和&nbsp;<code>n</code>，返回 s 中的&nbsp;<strong>最短窗口 <span data-keyword=\"substring-nonempty\">子串</span></strong>，使得该子串包含 <code>t</code> 中的每一个字符（<strong>包括重复字符</strong>）。如果没有这样的子串，返回空字符串<em>&nbsp;</em><code>\"\"</code>。</p>\n\n<p>测试用例保证答案唯一。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"ADOBECODEBANC\", t = \"ABC\"\n<strong>输出：</strong>\"BANC\"\n<strong>解释：</strong>最小覆盖子串 \"BANC\" 包含来自字符串 t 的 'A'、'B' 和 'C'。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"a\", t = \"a\"\n<strong>输出：</strong>\"a\"\n<strong>解释：</strong>整个字符串 s 是最小覆盖子串。\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"a\", t = \"aa\"\n<strong>输出:</strong> \"\"\n<strong>解释:</strong> t 中两个字符 'a' 均应包含在 s 的子串中，\n因此没有符合条件的子字符串，返回空字符串。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == s.length</code></li>\n\t<li><code>n == t.length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>s</code> 和 <code>t</code> 由英文字母组成</li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>进阶：</strong>你能设计一个在 <code>O(m + n)</code> 时间内解决此问题的算法吗？",
  "code": "class Solution {\npublic:\n    unordered_map <char, int> ori, cnt;\n\n    bool check() { // 窗口计数是否已覆盖 t 中每种字符的需求量\n        for (const auto &p: ori) {\n            if (cnt[p.first] < p.second) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    string minWindow(string s, string t) {\n        for (const auto &c: t) {\n            ++ori[c];\n        }\n\n        int l = 0, r = -1;\n        int len = INT_MAX, ansL = -1, ansR = -1;\n\n        while (r < int(s.size())) {\n            if (ori.find(s[++r]) != ori.end()) {\n                ++cnt[s[r]];\n            }\n            while (check() && l <= r) { // 已覆盖时尽量收缩左边界，更新最短答案\n                if (r - l + 1 < len) {\n                    len = r - l + 1;\n                    ansL = l;\n                }\n                if (ori.find(s[l]) != ori.end()) {\n                    --cnt[s[l]];\n                }\n                ++l;\n            }\n        }\n\n        return ansL == -1 ? string() : s.substr(ansL, len);\n    }\n};",
  "cards": [
   {
    "id": "p76-r-init-neg1",
    "crux": "r 的初始值必须是 -1，配合后面的前缀自增 ++r 才能让第一次循环从 s[0] 开始",
    "answer": "-1",
    "blankOffset": 402,
    "blankLen": 2,
    "options": [
     "-1",
     "0",
     "1"
    ],
    "why": "窗口 [l, r] 初始为空区间，循环体里用的是 s[++r]（先自增再取值），所以要让第一次循环执行完 ++r 后 r 变为 0，从而正确取到 s[0]；这要求初始值必须比 0 小 1，即 -1。",
    "wrongWhy": {
     "0": "第一次循环 ++r 会把 r 变成 1，导致 s[0] 被跳过，窗口计数从一开始就少统计了一个字符。",
     "1": "第一次循环 ++r 会把 r 变成 2，s[0] 和 s[1] 都会被漏掉，窗口统计从更靠后的位置才开始，结果必然出错。"
    }
   },
   {
    "id": "p76-len-init-intmax",
    "crux": "len 必须初始化为 INT_MAX，否则「r-l+1 < len」永远无法成立，答案不会被更新",
    "answer": "INT_MAX",
    "blankOffset": 424,
    "blankLen": 7,
    "options": [
     "INT_MAX",
     "0",
     "s.size()"
    ],
    "why": "len 记录当前已知的最短窗口长度，必须先给一个足够大的初值，才能保证第一次找到覆盖窗口时 r - l + 1 < len 一定成立，从而把这个窗口记为初始答案；后续再逐步用更短的窗口去更新它。",
    "wrongWhy": {
     "0": "任何窗口长度 r-l+1 都不可能小于 0，条件永远为 false，len 和 ansL 永远不会被更新，最终会返回空串。",
     "s.size()": "当最小覆盖子串恰好等于整个 s 的长度时，r-l+1 < s.size() 不成立，这唯一的答案会被漏掉更新，导致返回空串而不是正确的整串。"
    }
   },
   {
    "id": "p76-outer-loop-bound-r-size",
    "crux": "外层循环条件必须是 r < size()（严格小于），因为循环体里 r 会先自增再当下标用",
    "answer": "<",
    "blankOffset": 473,
    "blankLen": 1,
    "options": [
     "<",
     "<="
    ],
    "why": "循环体第一步是 ++r 再取 s[r]，所以进入循环体前 r 最大只能是 size()-2，这样自增后恰好是 size()-1，仍在合法范围内；条件用严格小于 < 才能保证这一点。",
    "wrongWhy": {
     "<=": "当 r == size()-1 时仍会进入循环体，执行 ++r 后 r 变成 size()，此时访问 s[r] 就是越界读取，属于未定义行为。"
    }
   },
   {
    "id": "p76-prefix-increment-r",
    "crux": "必须用前缀自增 ++r 先移动右指针再取字符，而不是后缀 r++",
    "answer": "++r",
    "blankOffset": 519,
    "blankLen": 3,
    "options": [
     "++r",
     "r++",
     "r"
    ],
    "why": "每轮外层循环需要先把右边界扩张一格，再用扩张后的下标去统计新加入窗口的字符；前缀自增 ++r 表达式的值就是自增后的 r，正好满足「先移动再取值」的需求。",
    "wrongWhy": {
     "r++": "后缀自增表达式的值是自增前的旧 r，第一次循环时 r 还是 -1，s[r++] 会先用 -1 去访问 s[-1]，直接越界读取，逻辑从一开始就错。",
     "r": "根本没有移动右边界，r 永远停在初始值，外层循环条件 r < size() 会一直为 true 却始终处理同一个字符，形成死循环。"
    }
   },
   {
    "id": "p76-check-count-less-than",
    "crux": "check() 里必须用「cnt < 需求量」判断某种字符不足，而不能用其他比较符号",
    "answer": "<",
    "blankOffset": 174,
    "blankLen": 1,
    "options": [
     "<",
     "<=",
     "!=",
     "=="
    ],
    "why": "窗口覆盖 t 的条件是：t 中出现的每一种字符，窗口内的计数都不能少于它在 t 中出现的次数；只要有一种字符计数严格小于需求量，就说明还没覆盖，应该返回 false。",
    "wrongWhy": {
     "<=": "当某字符计数恰好等于需求量（本已满足）时也会被判为不足，导致本已覆盖的窗口被误判为未覆盖，收缩逻辑永远不会被触发，找不到答案。",
     "!=": "当窗口内某字符计数大于需求量（例如窗口里重复出现更多次）时也会被判为不满足，本应视作已覆盖的情况被错误地否定。",
     "==": "逻辑完全反了，只有计数恰好相等才会继续检查其他字符，其余多数正常覆盖的情况都会被直接判定为 false，算法基本失效。"
    }
   },
   {
    "id": "p76-inner-loop-l-le-r",
    "crux": "内层收缩循环条件必须是 l <= r（允许 l 等于 r），否则窗口只剩一个字符时会漏掉收缩机会",
    "answer": "<=",
    "blankOffset": 616,
    "blankLen": 2,
    "options": [
     "<=",
     "<"
    ],
    "why": "当窗口收缩到只剩一个字符（l == r）时，这个字符仍可能满足覆盖条件（比如 t 长度为 1 的情况），此时仍需要检查并可能继续收缩、更新最短答案，所以要用 <= 而不是排除掉 l == r 这种情况。",
    "wrongWhy": {
     "<": "当 l == r 时循环条件直接为 false 而提前退出，即使此时窗口恰好满足覆盖条件也不会再做一次长度更新，可能错过真正的最短窗口。"
    }
   }
  ]
 },
 {
  "id": 78,
  "title": "78. 子集",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组&nbsp;<code>nums</code> ，数组中的元素 <strong>互不相同</strong> 。返回该数组所有可能的<span data-keyword=\"subset\">子集</span>（幂集）。</p>\n\n<p>解集 <strong>不能</strong> 包含重复的子集。你可以按 <strong>任意顺序</strong> 返回解集。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3]\n<strong>输出：</strong>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0]\n<strong>输出：</strong>[[],[0]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10</code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 中的所有元素 <strong>互不相同</strong></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> t;\n    vector<vector<int>> ans;\n\n    void dfs(int cur, vector<int>& nums) {\n        if (cur == nums.size()) {\n            ans.push_back(t);\n            return;\n        }\n        t.push_back(nums[cur]); // 选择当前元素\n        dfs(cur + 1, nums);\n        t.pop_back(); // 撤销选择\n        dfs(cur + 1, nums); // 不选当前元素\n    }\n\n    vector<vector<int>> subsets(vector<int>& nums) {\n        dfs(0, nums);\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p78-subset-base-case-cur-equals-size",
    "crux": "回溯到达末尾(cur==nums.size())时才存结果并return，不能提前也不能压根不触发",
    "answer": "cur == nums.size()",
    "blankOffset": 129,
    "blankLen": 18,
    "options": [
     "cur == nums.size()",
     "cur == nums.size() - 1",
     "cur > nums.size()"
    ],
    "why": "cur 从 0 开始，每层递归恰好 +1 推进一个下标，当 cur 等于 nums.size() 时说明 n 个元素已经全部做完「选/不选」的决策，此时应立刻把当前路径 t 存入答案并 return，作为递归的出口。",
    "wrongWhy": {
     "cur == nums.size() - 1": "会在还没决策最后一个元素（下标 size()-1）时就提前终止并记录答案，导致所有子集都漏掉最后一个元素，结果数量和内容都错。",
     "cur > nums.size()": "cur 每次严格 +1 递增，永远不会跳过 nums.size() 这个值，该条件永远为 false，出口永远不触发，dfs 会一直递归到 nums[cur] 越界访问，最终栈溢出/越界崩溃。"
    }
   },
   {
    "id": "p78-subset-dfs-advance-cur-plus-1",
    "crux": "每次递归调用必须把下标推进到 cur+1，否则无法收敛到 base case",
    "answer": "cur + 1",
    "blankOffset": 265,
    "blankLen": 7,
    "options": [
     "cur + 1",
     "cur",
     "cur - 1"
    ],
    "why": "dfs 的语义是「决策第 cur 个元素」，处理完当前元素后必须把下标推进到下一个未决策的元素，才能保证每层递归只在同一个下标上做一次「选」的分支，最终 cur 递增到 nums.size() 触发出口。",
    "wrongWhy": {
     "cur": "下标原地不动，dfs 会对同一个 nums[cur] 反复执行「选择」分支，永远到不了 base case，导致无限递归直至栈溢出。",
     "cur - 1": "下标反而回退，同样无法单调地逼近 nums.size() 这个终止条件，会无限递归（甚至下标变负后访问 nums[cur] 越界）。"
    }
   },
   {
    "id": "p78-subset-pop-back-restore-state",
    "crux": "「选」分支递归返回后必须 pop_back 撤销现场，否则会污染「不选」分支的路径 t",
    "answer": "t.pop_back(); // 撤销选择",
    "blankOffset": 289,
    "blankLen": 21,
    "options": [
     "t.pop_back(); // 撤销选择",
     "（删掉这一行，不做撤销）",
     "t.push_back(nums[cur]); // 撤销选择"
    ],
    "why": "t 是全局共享的路径数组，「选」分支进入前 push 了 nums[cur]，从该分支的递归返回后，必须把它弹出，才能让紧接着的「不选」分支拿到一条干净的路径（不含 nums[cur]），这样两条分支才是真正互斥的决策。",
    "wrongWhy": {
     "（删掉这一行，不做撤销）": "nums[cur] 会一直残留在 t 里，导致后续「不选」分支得到的子集其实也包含了 nums[cur]，产生大量重复/错误的子集。",
     "t.push_back(nums[cur]); // 撤销选择": "把撤销写成了再压入一次，t 里会出现两份 nums[cur]，路径越滚越长且永远不清空，子集内容完全错乱。"
    }
   }
  ]
 },
 {
  "id": 79,
  "title": "79. 单词搜索",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给定一个&nbsp;<code>m x n</code> 二维字符网格&nbsp;<code>board</code> 和一个字符串单词&nbsp;<code>word</code> 。如果&nbsp;<code>word</code> 存在于网格中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"ABCCED\"\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"SEE\"\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = \"ABCB\"\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == board.length</code></li>\n\t<li><code>n = board[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 6</code></li>\n\t<li><code>1 &lt;= word.length &lt;= 15</code></li>\n\t<li><code>board</code> 和 <code>word</code> 仅由大小写英文字母组成</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以使用搜索剪枝的技术来优化解决方案，使其在 <code>board</code> 更大的情况下可以更快解决问题？</p>",
  "code": "class Solution {\npublic:\n    bool check(vector<vector<char>>& board, vector<vector<int>>& visited, int i, int j, string& s, int k) {\n        if (board[i][j] != s[k]) {\n            return false;\n        } else if (k == s.length() - 1) {\n            return true;\n        }\n        visited[i][j] = true;\n        vector<pair<int, int>> directions{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};\n        bool result = false;\n        for (const auto& dir: directions) {\n            int newi = i + dir.first, newj = j + dir.second;\n            if (newi >= 0 && newi < board.size() && newj >= 0 && newj < board[0].size()) {\n                if (!visited[newi][newj]) {\n                    bool flag = check(board, visited, newi, newj, s, k + 1);\n                    if (flag) {\n                        result = true;\n                        break;\n                    }\n                }\n            }\n        }\n        visited[i][j] = false; // 回溯：撤销访问标记\n        return result;\n    }\n\n    bool exist(vector<vector<char>>& board, string word) {\n        int h = board.size(), w = board[0].size();\n        vector<vector<int>> visited(h, vector<int>(w));\n        for (int i = 0; i < h; i++) {\n            for (int j = 0; j < w; j++) {\n                bool flag = check(board, visited, i, j, word, 0);\n                if (flag) {\n                    return true;\n                }\n            }\n        }\n        return false;\n    }\n};",
  "cards": [
   {
    "id": "p79-word-search-success-index",
    "crux": "判断整个单词匹配完成的下标条件",
    "answer": "s.length() - 1",
    "blankOffset": 218,
    "blankLen": 14,
    "options": [
     "s.length() - 1",
     "s.length()",
     "s.length() + 1",
     "0"
    ],
    "why": "word 的下标从 0 开始，最后一个字符的下标是 s.length()-1；当当前字符匹配且 k 恰好到达这个下标时，说明整个单词已经从头到尾匹配成功，应当返回 true。",
    "wrongWhy": {
     "0": "只有单词长度为 1 时才恰好正确，其余情况下第一次匹配（k=0）就会被错误地判定为整体匹配成功，提前返回 true，产生假阳性。",
     "s.length()": "该下标已经越界（合法范围是 0..length-1），k 永远不会等于 s.length()，导致成功分支永远不会被触发，函数会一直往下递归甚至发生 s[k] 越界访问。",
     "s.length() + 1": "比 s.length() 更进一步越界，逻辑上更不可能成立，同样使成功分支失效。"
    }
   },
   {
    "id": "p79-word-search-bound-nonneg",
    "crux": "越界判断中行下标必须用 >= 0 而不是 > 0",
    "answer": "newi >= 0",
    "blankOffset": 528,
    "blankLen": 9,
    "options": [
     "newi >= 0",
     "newi > 0",
     "newi >= 1",
     "newi != 0"
    ],
    "why": "棋盘的合法行下标是 0 到 board.size()-1，0 本身是合法值，所以必须用 >= 0 才能保证第 0 行也能被搜索到。",
    "wrongWhy": {
     "newi > 0": "把 newi == 0 这一合法行排除在外，导致棋盘第 0 行永远无法作为下一步的候选格子，遗漏本应存在的匹配路径。",
     "newi >= 1": "与 > 0 等价，同样错误地排除了合法的第 0 行。",
     "newi != 0": "无法排除负数下标（比如 -1 != 0 为真），会让负的行下标通过检查，访问 board[-1][...] 导致越界崩溃。"
    }
   },
   {
    "id": "p79-word-search-restore-visited",
    "crux": "回溯返回前必须把 visited 标记撤销为 false",
    "answer": "visited[i][j] = false;",
    "blankOffset": 898,
    "blankLen": 22,
    "options": [
     "visited[i][j] = false;",
     "visited[i][j] = true;",
     "// 不撤销，直接 return result;"
    ],
    "why": "visited 标记的是当前搜索路径上已使用的格子，函数返回意味着以 (i,j) 为起点的这条路径分支结束，必须把标记还原为 false，这样其它从别的起点出发、可能经过 (i,j) 的路径才不会被误判为不可用。",
    "wrongWhy": {
     "visited[i][j] = true;": "保持访问标记为 true，导致该格子对之后所有其它路径都显示为“已占用”，从而错误地挡住本该成功的其它匹配路径，造成漏解。",
     "// 不撤销，直接 return result;": "完全省略撤销这一步，效果和写成 true 一样，是回溯法里最经典的“忘记回溯”bug，会导致后续搜索分支被错误地判定为不可访问。"
    }
   },
   {
    "id": "p79-word-search-start-k-zero",
    "crux": "从起点格子开始搜索时，字符匹配下标必须从 0 开始",
    "answer": "0",
    "blankOffset": 1272,
    "blankLen": 1,
    "options": [
     "0",
     "1",
     "-1"
    ],
    "why": "k 表示当前正在用哪个格子匹配 word 的第几个字符；每个起点格子第一次都是要去匹配 word 的第一个字符，也就是下标 0，所以初始调用必须传 0。",
    "wrongWhy": {
     "1": "直接跳过了对 word[0] 的匹配检查，相当于假定起点格子已经匹配了第一个字符，会导致大量本该失败的路径被错误地继续搜索，也会让下标整体错位。",
     "-1": "递归内部会用 s[k] 访问字符串，k=-1 即访问 s[-1]，属于未定义行为，可能直接崩溃或产生不可预知的错误结果。"
    }
   }
  ]
 },
 {
  "id": 84,
  "title": "84. 柱状图中最大的矩形",
  "category": "栈",
  "difficulty": "hard",
  "descHtml": "<p>给定 <em>n</em> 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。</p>\n\n<p>求在该柱状图中，能够勾勒出来的矩形的最大面积。</p>\n\n<p> </p>\n\n<p><strong>示例 1:</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>heights = [2,1,5,6,2,3]\n<strong>输出：</strong>10\n<strong>解释：</strong>最大的矩形为图中红色区域，面积为 10\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong> heights = [2,4]\n<b>输出：</b> 4</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= heights.length <=10<sup>5</sup></code></li>\n\t<li><code>0 <= heights[i] <= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        int n = heights.size();\n        vector<int> left(n), right(n);\n\n        stack<int> mono_stack;\n        for (int i = 0; i < n; ++i) {\n            while (!mono_stack.empty() && heights[mono_stack.top()] >= heights[i]) {\n                mono_stack.pop();\n            }\n            left[i] = (mono_stack.empty() ? -1 : mono_stack.top()); // 左边第一个高度小于它的下标，不存在记 -1\n            mono_stack.push(i);\n        }\n\n        mono_stack = stack<int>();\n        for (int i = n - 1; i >= 0; --i) {\n            while (!mono_stack.empty() && heights[mono_stack.top()] >= heights[i]) {\n                mono_stack.pop();\n            }\n            right[i] = (mono_stack.empty() ? n : mono_stack.top()); // 右边第一个高度小于它的下标，不存在记 n\n            mono_stack.push(i);\n        }\n\n        int ans = 0;\n        for (int i = 0; i < n; ++i) {\n            ans = max(ans, (right[i] - left[i] - 1) * heights[i]); // 以 heights[i] 为高能延伸的宽度\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p84-left-boundary-init-minus1",
    "crux": "左边没有更矮柱子时，left[i] 必须记为 -1（哨兵值），这样宽度公式 right-left-1 才能算出延伸到数组最左端",
    "answer": "-1",
    "blankOffset": 396,
    "blankLen": 2,
    "options": [
     "-1",
     "0",
     "n",
     "i"
    ],
    "why": "栈为空说明左边没有比它更矮的柱子（左侧柱子高度都 >= 它，已被全部弹出），可以一直向左延伸到数组最左端（下标 0）。用 -1 作为『虚拟左边界』，配合宽度公式 right[i]-left[i]-1，才能把延伸到下标 0 的那一段也正确算进宽度（例如某柱 left=-1、right=n 时，宽度 = n-(-1)-1 = n，恰好覆盖整段）。",
    "wrongWhy": {
     "0": "把左边界当成真实下标 0 参与减法，会让能延伸到最左端的柱子宽度整体少算 1 格，导致这些柱子的面积都偏小 1。",
     "n": "误用了右边界的哨兵值，语义完全颠倒，宽度公式 right-left-1 会算出严重错误（甚至负数）的宽度。",
     "i": "把自己的下标当左边界，等于认定它无法向左延伸半格，宽度丢掉整个左半部分被少算，能向左延伸的柱子面积全部偏小。"
    }
   },
   {
    "id": "p84-right-boundary-init-n",
    "crux": "右边没有更矮柱子时，right[i] 必须记为 n（越界哨兵），配合宽度公式才能算出延伸到数组最右端",
    "answer": "n",
    "blankOffset": 744,
    "blankLen": 1,
    "options": [
     "n",
     "n - 1",
     "-1",
     "0"
    ],
    "why": "栈为空说明右边所有柱子都不比它矮，能一直延伸到数组最右端（下标 n-1），用越界后一位的 n 作为哨兵，使宽度公式 right[i]-left[i]-1 能正确算出到 n-1 的实际宽度。",
    "wrongWhy": {
     "0": "right=0 会使宽度公式 0-left-1 退化为严重偏小甚至负数的结果，完全破坏右延伸的计算。",
     "n - 1": "把哨兵当成真实最后下标参与减法，会让能延伸到最右端的柱子宽度都少算 1。",
     "-1": "误用了左边界的哨兵值，语义颠倒，宽度公式会算出错误甚至负值的结果。"
    }
   },
   {
    "id": "p84-right-loop-start-index",
    "crux": "从右向左遍历必须用 i >= 0（含下标0），否则最左边那根柱子的 right[0] 永远算不到，留下默认的0值",
    "answer": ">= 0",
    "blankOffset": 553,
    "blankLen": 4,
    "options": [
     ">= 0",
     "> 0",
     ">= 1"
    ],
    "why": "下标0对应的柱子也需要求出它的右边界，循环条件必须包含 i==0 这一次迭代，用 i >= 0 才能覆盖到最左端的柱子。",
    "wrongWhy": {
     "> 0": "i=0 时循环体不再执行，right[0] 保持 vector<int> right(n) 的默认值 0；用这个错误的 0 算 i=0 的宽度会得到 0-(-1)-1=0、面积为 0，若最优矩形以最左柱为高就会被漏掉。",
     ">= 1": "与 > 0 效果相同，同样跳过 i=0 这次迭代，导致下标0的右边界未被正确计算。"
    }
   },
   {
    "id": "p84-width-formula-minus-one",
    "crux": "宽度公式必须是 right[i]-left[i]-1，这个 -1 是把左右两个边界之间的开区间正确计数的关键",
    "answer": "- 1",
    "blankOffset": 940,
    "blankLen": 3,
    "options": [
     "- 1",
     "+ 1",
     "- 2"
    ],
    "why": "left[i] 和 right[i] 本身是『第一个更矮』的边界柱子下标，实际可用宽度是开区间 (left[i], right[i]) 内的柱子数，即 right[i]-left[i]-1（右开区间内整数个数 = 右端减左端再减 1）。",
    "wrongWhy": {
     "+ 1": "right-left+1 与正确的 right-left-1 相差 2，宽度多算 2 格，算出的面积严重偏大、答案偏高。",
     "- 2": "比正确公式少算 1 格，会使每根柱子的可延伸宽度都偏小 1，最终答案可能比真实最大面积小。"
    }
   }
  ]
 },
 {
  "id": 94,
  "title": "94. 二叉树的中序遍历",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给定一个二叉树的根节点 <code>root</code> ，返回 <em>它的 <strong>中序</strong>&nbsp;遍历</em> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,null,2,3]\n<strong>输出：</strong>[1,3,2]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1]\n<strong>输出：</strong>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[0, 100]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶:</strong>&nbsp;递归算法很简单，你可以通过迭代算法完成吗？</p>",
  "code": "class Solution {\npublic:\n    void inorder(TreeNode* root, vector<int>& res) {\n        if (!root) {\n            return;\n        }\n        inorder(root->left, res);\n        res.push_back(root->val);\n        inorder(root->right, res);\n    }\n    vector<int> inorderTraversal(TreeNode* root) {\n        vector<int> res;\n        inorder(root, res);\n        return res;\n    }\n};",
  "cards": [
   {
    "id": "p94-inorder-push-position",
    "crux": "push_back 的位置必须在两次递归调用之间，决定了这是中序而非前序/后序/反中序遍历",
    "answer": "inorder(root->left, res);\n        res.push_back(root->val);\n        inorder(root->right, res);",
    "blankOffset": 137,
    "blankLen": 94,
    "options": [
     "inorder(root->left, res);\n        res.push_back(root->val);\n        inorder(root->right, res);",
     "res.push_back(root->val);\n        inorder(root->left, res);\n        inorder(root->right, res);",
     "inorder(root->left, res);\n        inorder(root->right, res);\n        res.push_back(root->val);",
     "inorder(root->right, res);\n        res.push_back(root->val);\n        inorder(root->left, res);"
    ],
    "why": "中序遍历的定义就是「左子树、根、右子树」，前/中/后序代码结构几乎相同，唯一区别就是 push_back(root->val) 放在两次递归调用之前、之间还是之后；solutionText 明确点出「三种遍历只差 push 的位置」，所以 push 必须夹在 inorder(left) 和 inorder(right) 中间才是中序。",
    "wrongWhy": {
     "res.push_back(root->val);\n        inorder(root->left, res);\n        inorder(root->right, res);": "把 push_back 挪到最前面，根节点先于左右子树被收集，这变成了前序遍历（根-左-右），不满足中序要求。",
     "inorder(root->left, res);\n        inorder(root->right, res);\n        res.push_back(root->val);": "把 push_back 挪到最后面，根节点在左右子树之后才被收集，这变成了后序遍历（左-右-根），同样不是中序。",
     "inorder(root->right, res);\n        res.push_back(root->val);\n        inorder(root->left, res);": "把左右递归的顺序互换（先右后左），虽然 push 仍在中间，但遍历顺序变成「右-根-左」，是中序的镜像/逆序（在二叉搜索树上会得到降序），并非题目要求的中序结果。"
    }
   }
  ]
 },
 {
  "id": 98,
  "title": "98. 验证二叉搜索树",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给你一个二叉树的根节点 <code>root</code> ，判断其是否是一个有效的二叉搜索树。</p>\n\n<p><strong>有效</strong> 二叉搜索树定义如下：</p>\n\n<ul>\n\t<li>节点的左<span data-keyword=\"subtree\">子树</span>只包含<strong>&nbsp;严格小于 </strong>当前节点的数。</li>\n\t<li>节点的右子树只包含 <strong>严格大于</strong> 当前节点的数。</li>\n\t<li>所有左子树和右子树自身必须也是二叉搜索树。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [2,1,3]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [5,1,4,null,null,3,6]\n<strong>输出：</strong>false\n<strong>解释：</strong>根节点的值是 5 ，但是右子节点的值是 4 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围在<code>[1, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool helper(TreeNode* root, long long lower, long long upper) {\n        if (root == nullptr) {\n            return true;\n        }\n        if (root -> val <= lower || root -> val >= upper) { // 节点值必须严格落在开区间 (lower, upper) 内\n            return false;\n        }\n        return helper(root -> left, lower, root -> val) && helper(root -> right, root -> val, upper);\n    }\n    bool isValidBST(TreeNode* root) {\n        return helper(root, LONG_MIN, LONG_MAX);\n    }\n};",
  "cards": [
   {
    "id": "p98-bst-lower-bound-strict-check",
    "crux": "下界比较必须用 <= 而非 <,以判定等值也非法(BST 不允许重复值落在同一开区间边界)",
    "answer": "<=",
    "blankOffset": 183,
    "blankLen": 2,
    "options": [
     "<=",
     "<"
    ],
    "why": "solutionText 明确要求节点值必须\"严格\"落在开区间 (lower, upper) 内,即等于下界也算非法,所以要用 <= 才能把 val==lower 的情况也判成 false。",
    "wrongWhy": {
     "<": "改成 < 后,只有严格小于 lower 才判非法,val 恰好等于 lower 时会被放过,允许出现重复值,破坏 BST 严格递增的定义。"
    }
   },
   {
    "id": "p98-bst-upper-bound-strict-check",
    "crux": "上界比较必须用 >= 而非 >,以判定等值也非法",
    "answer": ">=",
    "blankOffset": 207,
    "blankLen": 2,
    "options": [
     ">=",
     ">"
    ],
    "why": "同下界一样,节点值必须严格小于 upper,等于 upper 也属于非法,所以要用 >= 才能覆盖这种边界情况。",
    "wrongWhy": {
     ">": "改成 > 后,val 恰好等于 upper 时不会被判非法,漏掉了重复值的非法情况,导致验证结果出错。"
    }
   },
   {
    "id": "p98-bst-left-recurse-narrow-upper",
    "crux": "往左子树递归时,要把上界收紧为 root->val,下界保持原 lower 不变",
    "answer": "lower, root -> val",
    "blankOffset": 324,
    "blankLen": 18,
    "options": [
     "lower, root -> val",
     "root -> val, upper",
     "upper, root -> val"
    ],
    "why": "solutionText 指出往左递归要把上界收紧为当前节点值,下界维持不变,因为左子树所有节点都必须小于 root->val,同时仍要满足原来的下界约束。",
    "wrongWhy": {
     "root -> val, upper": "相当于把 lower 参数位填成了 root->val、upper 参数位维持成 upper,等价于没有收紧上界反而错误地收紧了下界,导致左子树里大于 root->val 的非法节点可能被放过。",
     "upper, root -> val": "把下界参数错填成未收紧的 upper,丢失了从祖先传下来的真实下界约束,可能把本应判非法的过小值误判为合法。"
    }
   },
   {
    "id": "p98-bst-right-recurse-narrow-lower",
    "crux": "往右子树递归时,要把下界收紧为 root->val,上界保持原 upper 不变",
    "answer": "root -> val, upper",
    "blankOffset": 369,
    "blankLen": 18,
    "options": [
     "root -> val, upper",
     "lower, root -> val",
     "upper, root -> val"
    ],
    "why": "solutionText 指出往右递归要把下界收紧为当前节点值,上界维持不变,因为右子树所有节点都必须大于 root->val,同时仍要满足原来的上界约束。",
    "wrongWhy": {
     "lower, root -> val": "相当于错误地把上界收紧成 root->val、下界却没收紧,导致右子树本该更大的下界约束丢失,过小的非法节点可能被误判为合法。",
     "upper, root -> val": "下界参数填成了未收紧的 upper,上界参数填成 root->val,完全颠倒了收紧方向,右子树的验证逻辑会整体错乱。"
    }
   },
   {
    "id": "p98-bst-initial-long-bounds",
    "crux": "初始调用必须用 LONG_MIN/LONG_MAX 而非 INT_MIN/INT_MAX,防止节点值恰为 int 边界时被误判",
    "answer": "LONG_MIN, LONG_MAX",
    "blankOffset": 462,
    "blankLen": 18,
    "options": [
     "LONG_MIN, LONG_MAX",
     "INT_MIN, INT_MAX",
     "0, INT_MAX"
    ],
    "why": "solutionText 说明初始边界用 LONG_MIN/LONG_MAX,是为了防止节点值恰好为 INT_MIN 或 INT_MAX 时,与初始边界相等而被 <=/>= 判断误判为非法。",
    "wrongWhy": {
     "INT_MIN, INT_MAX": "若根节点值恰好为 INT_MIN 或 INT_MAX,判断 val<=lower 或 val>=upper 会成立,导致本来合法的根节点被误判为非法。",
     "0, INT_MAX": "隐含假设根节点值必为非负数,若根节点值为负数,会被立即误判为非法,完全破坏算法的通用性。"
    }
   }
  ]
 },
 {
  "id": 101,
  "title": "101. 对称二叉树",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给你一个二叉树的根节点 <code>root</code> ， 检查它是否轴对称。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2,2,3,4,4,3]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2,2,null,3,null,3]\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[1, 1000]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以运用递归和迭代两种方法解决这个问题吗？</p>",
  "code": "class Solution {\npublic:\n    bool check(TreeNode *p, TreeNode *q) {\n        if (!p && !q) return true;\n        if (!p || !q) return false;\n        return p->val == q->val && check(p->left, q->right) && check(p->right, q->left); // 镜像：左对右、右对左交叉比较\n    }\n\n    bool isSymmetric(TreeNode* root) {\n        return check(root->left, root->right);\n    }\n};",
  "cards": [
   {
    "id": "p101-symmetric-null-check-and-or",
    "crux": "两个节点都为空才判定对称为 true，写成 || 会把「一空一非空」误判为对称",
    "answer": "!p && !q",
    "blankOffset": 80,
    "blankLen": 8,
    "options": [
     "!p && !q",
     "!p || !q",
     "p && q"
    ],
    "why": "只有当 p 和 q 同时为空时，这两棵子树才算「空对空」的对称基准情形，必须用 && 保证两者都为空才返回 true；紧接着下一行用 !p || !q 处理「恰好一个为空」的非对称情况，两行配合才完整。",
    "wrongWhy": {
     "!p || !q": "该行在下一行判断之前执行，若改成 ||，则只要 p、q 中有一个为空就会提前返回 true，把一空一非空这种明显不对称的情况错误地判为对称，永远走不到下一行的 false 分支。",
     "p && q": "把取反写掉了，条件变成两边都非空才返回 true；这样两边都为空（本应对称）的情况反而落不到这个分支，逻辑完全错乱。"
    }
   },
   {
    "id": "p101-symmetric-cross-recursion",
    "crux": "两次递归调用必须交叉传参（左对右、右对左），漏掉交叉就变成判断“树是否相同”而非“互为镜像”",
    "answer": "check(p->left, q->right)",
    "blankOffset": 174,
    "blankLen": 24,
    "options": [
     "check(p->left, q->right)",
     "check(p->left, q->left)",
     "check(q->left, p->right)"
    ],
    "why": "判断两棵树互为镜像，要求 p 的左子树与 q 的右子树互为镜像、p 的右子树与 q 的左子树互为镜像；代码里另一处已经写了 check(p->right, q->left)（右对左），所以这一处必须交叉写成 check(p->left, q->right)（左对右），两次调用才能覆盖完整的镜像关系。",
    "wrongWhy": {
     "check(p->left, q->left)": "变成同侧比较（左对左），实际上是在判断两棵树是否完全相同，而不是互为镜像；例如一棵树本身左右子树对称但整体不是镜像结构时会被误判。",
     "check(q->left, p->right)": "由于 check 函数值比较和递归结构都是对称的，check(q->left, p->right) 与另一行的 check(p->right, q->left) 在功能上等价，等于重复了同一个比较、漏掉了 p->left 对 q->right 这一必要的镜像检查，会导致部分非对称的树被误判为对称。"
    }
   }
  ]
 },
 {
  "id": 102,
  "title": "102. 二叉树的层序遍历",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>层序遍历</strong> 。 （即逐层地，从左到右访问所有节点）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [3,9,20,null,null,15,7]\n<strong>输出：</strong>[[3],[9,20],[15,7]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1]\n<strong>输出：</strong>[[1]]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[0, 2000]</code> 内</li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector <vector <int>> ret;\n        if (!root) {\n            return ret;\n        }\n\n        queue <TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int currentLevelSize = q.size(); // 不变量：此刻队列里恰好是当前层的全部节点\n            ret.push_back(vector <int> ());\n            for (int i = 1; i <= currentLevelSize; ++i) {\n                auto node = q.front(); q.pop();\n                ret.back().push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n        }\n\n        return ret;\n    }\n};",
  "cards": [
   {
    "id": "p102-level-size-snapshot",
    "crux": "必须在循环开始前用变量快照队列长度，而不能在循环条件里动态调用 q.size()",
    "answer": "currentLevelSize",
    "blankOffset": 395,
    "blankLen": 16,
    "options": [
     "currentLevelSize",
     "q.size()",
     "currentLevelSize - 1"
    ],
    "why": "currentLevelSize 在循环开始前被固定快照，恰好等于当前层节点数；循环体中会不断把子节点 push 进队列，队列真实大小在循环过程中持续变化，所以必须用快照值而不是实时的 q.size() 来控制循环次数，才能精确只弹出当前层的节点。",
    "wrongWhy": {
     "q.size()": "每次判断循环条件都会重新求值 q.size()，而循环体内会 push 左右子节点使队列变大，导致条件被不断顶高、多弹出属于下一层的节点，层次划分被破坏。",
     "currentLevelSize - 1": "i 从 1 开始计数，条件写成 currentLevelSize - 1 会少循环一次，该层最后一个节点留在队列头部未被处理，会被下一轮误当成下一层的节点，数量和顺序都错。"
    }
   },
   {
    "id": "p102-level-loop-bound",
    "crux": "for 循环边界要用 i <= currentLevelSize（i 从 1 开始），不能写成 i < currentLevelSize",
    "answer": "i <= currentLevelSize",
    "blankOffset": 390,
    "blankLen": 21,
    "options": [
     "i <= currentLevelSize",
     "i < currentLevelSize",
     "i <= currentLevelSize - 1"
    ],
    "why": "i 从 1 开始计数，要恰好循环 currentLevelSize 次才能把该层全部节点弹出，因此条件必须是 i <= currentLevelSize。",
    "wrongWhy": {
     "i < currentLevelSize": "i 从 1 开始时该条件只会循环 currentLevelSize - 1 次，少弹出一个节点，该层最后一个节点残留在队列里，被下一轮误当成下一层节点，输出的层次和数量都错误。",
     "i <= currentLevelSize - 1": "等价于 i < currentLevelSize，同样少循环一次，导致该层最后一个节点被漏处理，错误与上面相同。"
    }
   },
   {
    "id": "p102-empty-root-check",
    "crux": "空树要先判断 !root 直接返回空结果，防止空指针被压入队列后解引用",
    "answer": "!root",
    "blankOffset": 125,
    "blankLen": 5,
    "options": [
     "!root",
     "root",
     "!q.empty()"
    ],
    "why": "root 为 nullptr 时树中没有任何节点可遍历，必须提前返回空结果；否则后面 q.push(root) 会把空指针塞进队列，循环里对 node->val 解引用空指针会直接崩溃。",
    "wrongWhy": {
     "root": "条件写反：树非空（root 不为空）时反而会提前返回空结果，导致任何非空二叉树都遍历不到、直接得到空数组；而真正需要提前返回的空树情况反而进不了这个分支。",
     "!q.empty()": "此时 queue q 尚未声明（声明语句在这行之后），用队列是否非空来判断根节点是否存在，语义完全不对，起不到拦截空指针入队的作用。"
    }
   },
   {
    "id": "p102-push-left-before-right",
    "crux": "子节点必须先 push 左孩子再 push 右孩子，保证下一层仍然是从左到右的顺序",
    "answer": "if (node->left) q.push(node->left);",
    "blankOffset": 533,
    "blankLen": 35,
    "options": [
     "if (node->left) q.push(node->left);",
     "if (node->right) q.push(node->right);"
    ],
    "why": "题解要求每层内节点从左到右排列；只有先把左孩子入队、再把右孩子入队，下一层出队时才会自然保持从左到右的顺序。",
    "wrongWhy": {
     "if (node->right) q.push(node->right);": "这里若也填右孩子，就与紧接的下一行重复：左孩子永远不会入队（该节点整个左子树全部丢失），右孩子却被重复入队，结果既缺节点又重复，输出彻底错误。"
    }
   }
  ]
 },
 {
  "id": 104,
  "title": "104. 二叉树的最大深度",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给定一个二叉树 <code>root</code> ，返回其最大深度。</p>\n\n<p>二叉树的 <strong>最大深度</strong> 是指从根节点到最远叶子节点的最长路径上的节点数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<p>&nbsp;</p>\n\n<pre>\n<b>输入：</b>root = [3,9,20,null,null,15,7]\n<b>输出：</b>3\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<b>输入：</b>root = [1,null,2]\n<b>输出：</b>2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点的数量在&nbsp;<code>[0, 10<sup>4</sup>]</code>&nbsp;区间内。</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (root == nullptr) return 0;\n        return max(maxDepth(root->left), maxDepth(root->right)) + 1;\n    }\n};",
  "cards": [
   {
    "id": "p104-base-case-return-0",
    "crux": "递归出口空节点的深度必须是 0，不能写成 1 或 -1，否则整体深度会多算或少算一层",
    "answer": "0",
    "blankOffset": 96,
    "blankLen": 1,
    "options": [
     "0",
     "1",
     "-1"
    ],
    "why": "空节点不构成任何一层，深度定义为 0；depth(root)=max(depth(left),depth(right))+1 里的 +1 已经把当前节点这一层算进去了，所以出口必须是 0，否则每一层都会被重复计数导致深度整体偏大（写成1）或偏小（写成-1）。",
    "wrongWhy": {
     "1": "把空节点当成一层来算，会导致每个叶子节点的深度都多算 1，最终整棵树深度整体偏大。",
     "-1": "这是常见于『边数』而非『节点数』定义深度时的出口值，混用到本题节点数定义里会导致最终深度少算 1。"
    }
   },
   {
    "id": "p104-depth-plus-one",
    "crux": "合并左右子树结果时必须 +1 计入当前根节点这一层，写成其它系数会导致深度计算错误",
    "answer": "+ 1",
    "blankOffset": 163,
    "blankLen": 3,
    "options": [
     "+ 1",
     "+ 0",
     "* 2"
    ],
    "why": "当前节点的深度 = 左右子树中较深的一支的深度，再加上当前节点自身这一层，所以要 +1；这是树形递归模板里『用子结果合成当前答案』的关键一步。",
    "wrongWhy": {
     "+ 0": "漏掉当前节点这一层，整棵树的深度会比实际值少 1（对每一层递归都会少算，根节点处最终结果偏小最多）。",
     "* 2": "深度是加法累积（每层 +1），不是倍增关系，写成乘 2 会让深度随子树层数指数级放大，结果完全错误。"
    }
   }
  ]
 },
 {
  "id": 105,
  "title": "105. 从前序与中序遍历序列构造二叉树",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给定两个整数数组&nbsp;<code>preorder</code> 和 <code>inorder</code>&nbsp;，其中&nbsp;<code>preorder</code> 是二叉树的<strong>先序遍历</strong>， <code>inorder</code>&nbsp;是同一棵树的<strong>中序遍历</strong>，请构造二叉树并返回其根节点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入</strong><strong>:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n<strong>输出:</strong> [3,9,20,null,null,15,7]\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> preorder = [-1], inorder = [-1]\n<strong>输出:</strong> [-1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= preorder.length &lt;= 3000</code></li>\n\t<li><code>inorder.length == preorder.length</code></li>\n\t<li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li>\n\t<li><code>preorder</code>&nbsp;和&nbsp;<code>inorder</code>&nbsp;均 <strong>无重复</strong> 元素</li>\n\t<li><code>inorder</code>&nbsp;均出现在&nbsp;<code>preorder</code></li>\n\t<li><code>preorder</code>&nbsp;<strong>保证</strong> 为二叉树的前序遍历序列</li>\n\t<li><code>inorder</code>&nbsp;<strong>保证</strong> 为二叉树的中序遍历序列</li>\n</ul>",
  "code": "class Solution {\nprivate:\n    unordered_map<int, int> index;\n\npublic:\n    TreeNode* myBuildTree(const vector<int>& preorder, const vector<int>& inorder, int preorder_left, int preorder_right, int inorder_left, int inorder_right) {\n        if (preorder_left > preorder_right) {\n            return nullptr;\n        }\n\n        // 前序遍历中的第一个节点就是根节点\n        int preorder_root = preorder_left;\n        // 在中序遍历中定位根节点\n        int inorder_root = index[preorder[preorder_root]];\n\n        // 先把根节点建立出来\n        TreeNode* root = new TreeNode(preorder[preorder_root]);\n        // 得到左子树中的节点数目\n        int size_left_subtree = inorder_root - inorder_left;\n        // 递归地构造左子树，并连接到根节点\n        // 先序遍历中「从 左边界+1 开始的 size_left_subtree」个元素就对应了中序遍历中「从 左边界 开始到 根节点定位-1」的元素\n        root->left = myBuildTree(preorder, inorder, preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1);\n        // 递归地构造右子树，并连接到根节点\n        // 先序遍历中「从 左边界+1+左子树节点数目 开始到 右边界」的元素就对应了中序遍历中「从 根节点定位+1 到 右边界」的元素\n        root->right = myBuildTree(preorder, inorder, preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right);\n        return root;\n    }\n\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        int n = preorder.size();\n        // 构造哈希映射，帮助我们快速定位根节点\n        for (int i = 0; i < n; ++i) {\n            index[inorder[i]] = i;\n        }\n        return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);\n    }\n};",
  "cards": [
   {
    "id": "p105-base-case-empty-interval",
    "crux": "递归出口判断空区间用 >，不能写成 >=",
    "answer": ">",
    "blankOffset": 257,
    "blankLen": 1,
    "options": [
     ">",
     ">=",
     "<"
    ],
    "why": "区间为空当且仅当左边界超过右边界（preorder_left > preorder_right），此时元素个数为 0 才应该返回 nullptr。",
    "wrongWhy": {
     ">=": "当 preorder_left == preorder_right 时（区间恰好剩一个节点）会被误判为空，导致这个叶子节点漏建，整棵树少节点。",
     "<": "判断方向完全反了，正常非空区间会直接返回 nullptr，递归根本无法往下建树。"
    }
   },
   {
    "id": "p105-size-left-subtree-formula",
    "crux": "左子树节点数 = 根在中序的下标 - 中序左边界，不多不少",
    "answer": "inorder_root - inorder_left",
    "blankOffset": 610,
    "blankLen": 27,
    "options": [
     "inorder_root - inorder_left",
     "inorder_root - inorder_left - 1",
     "inorder_root - inorder_left + 1"
    ],
    "why": "中序遍历中根节点左边的所有元素都属于左子树，个数恰好是 inorder_root（根的下标）减去 inorder_left（区间左边界）。",
    "wrongWhy": {
     "inorder_root - inorder_left - 1": "少算一个节点，导致后续左子树的前序/中序区间都少划一个元素，右子树起点随之整体错位。",
     "inorder_root - inorder_left + 1": "把根节点自己也算进了左子树长度，导致左右子树区间发生重叠。"
    }
   },
   {
    "id": "p105-left-subtree-preorder-right-bound",
    "crux": "左子树前序区间右端点 = preorder_left + size_left_subtree",
    "answer": "preorder_left + size_left_subtree",
    "blankOffset": 820,
    "blankLen": 33,
    "options": [
     "preorder_left + size_left_subtree",
     "preorder_left + size_left_subtree - 1",
     "preorder_left + size_left_subtree + 1"
    ],
    "why": "左子树在前序中从 preorder_left+1 开始，长度为 size_left_subtree 个元素，所以右端点是 preorder_left + size_left_subtree（左闭右闭区间）。",
    "wrongWhy": {
     "preorder_left + size_left_subtree - 1": "少包含一个元素，左子树漏掉最后一个节点，该节点会被错误地划到右子树处理。",
     "preorder_left + size_left_subtree + 1": "多包含一个本属于右子树的节点，导致左右子树前序区间重叠。"
    }
   },
   {
    "id": "p105-left-subtree-inorder-right-bound",
    "crux": "左子树中序区间右端点要减1，跳过根节点自己",
    "answer": "inorder_root - 1",
    "blankOffset": 869,
    "blankLen": 16,
    "options": [
     "inorder_root - 1",
     "inorder_root",
     "inorder_root + 1"
    ],
    "why": "中序遍历里左子树区间是从 inorder_left 到根节点位置的前一个下标，根节点本身不属于任何子树，必须排除在外。",
    "wrongWhy": {
     "inorder_root": "把根节点自己也划入左子树的中序区间，导致根节点被重复处理。",
     "inorder_root + 1": "把右子树的第一个节点错误地纳入左子树的中序区间。"
    }
   },
   {
    "id": "p105-right-subtree-preorder-left-bound",
    "crux": "右子树前序起点要跳过根节点和整个左子树",
    "answer": "preorder_left + size_left_subtree + 1",
    "blankOffset": 1043,
    "blankLen": 37,
    "options": [
     "preorder_left + size_left_subtree + 1",
     "preorder_left + size_left_subtree",
     "preorder_left + size_left_subtree + 2"
    ],
    "why": "右子树在前序中的起点需要跳过根节点（+1）和整个左子树（+size_left_subtree），即 preorder_left + size_left_subtree + 1。",
    "wrongWhy": {
     "preorder_left + size_left_subtree": "少加1，会把左子树的最后一个节点重复当作右子树的起点。",
     "preorder_left + size_left_subtree + 2": "多跳过一个位置，导致右子树漏掉本该属于它的第一个节点。"
    }
   },
   {
    "id": "p105-right-subtree-inorder-left-bound",
    "crux": "右子树中序起点要跳过根节点，从 inorder_root+1 开始",
    "answer": "inorder_root + 1",
    "blankOffset": 1098,
    "blankLen": 16,
    "options": [
     "inorder_root + 1",
     "inorder_root",
     "inorder_root - 1"
    ],
    "why": "右子树在中序中的起点是根节点位置的下一个下标，跳过根节点本身。",
    "wrongWhy": {
     "inorder_root": "把根节点重复纳入右子树的中序区间。",
     "inorder_root - 1": "把左子树的最后一个节点错误地纳入右子树的中序区间，造成区间重叠。"
    }
   },
   {
    "id": "p105-hashmap-loop-bound",
    "crux": "建立中序值到下标映射的循环要用 i < n，不能越界到 n",
    "answer": "<",
    "blankOffset": 1320,
    "blankLen": 1,
    "options": [
     "<",
     "<="
    ],
    "why": "数组合法下标范围是 [0, n-1]，循环条件写 i < n 才能覆盖所有元素且不越界。",
    "wrongWhy": {
     "<=": "当 i == n 时会访问 inorder[n]，这是越界访问，行为未定义，可能读到脏数据或直接崩溃。"
    }
   }
  ]
 },
 {
  "id": 108,
  "title": "108. 将有序数组转换为二叉搜索树",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，其中元素已经按 <strong>升序</strong> 排列，请你将其转换为一棵 <span data-keyword=\"height-balanced\">平衡</span> 二叉搜索树。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-10,-3,0,5,9]\n<strong>输出：</strong>[0,-3,9,-10,null,5]\n<strong>解释：</strong>[0,-10,5,null,-3,null,9] 也将被视为正确答案：\n\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,3]\n<strong>输出：</strong>[3,1]\n<strong>解释：</strong>[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>nums</code> 按 <strong>严格递增</strong> 顺序排列</li>\n</ul>",
  "code": "class Solution {\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        return helper(nums, 0, nums.size() - 1);\n    }\n\n    TreeNode* helper(vector<int>& nums, int left, int right) {\n        if (left > right) {\n            return nullptr;\n        }\n\n        // 总是选择中间位置左边的数字作为根节点\n        int mid = (left + right) / 2;\n\n        TreeNode* root = new TreeNode(nums[mid]);\n        root->left = helper(nums, left, mid - 1);\n        root->right = helper(nums, mid + 1, right);\n        return root;\n    }\n};",
  "cards": [
   {
    "id": "p108-bst-init-right-bound",
    "crux": "初始调用的右边界必须是 size()-1,不能多1或少1",
    "answer": "nums.size() - 1",
    "blankOffset": 108,
    "blankLen": 15,
    "options": [
     "nums.size() - 1",
     "nums.size()",
     "nums.size() - 2"
    ],
    "why": "数组下标范围是 [0, size()-1],right 必须指向最后一个合法下标;这样 helper 内部的 mid 计算和 nums[mid] 访问才始终落在合法区间内。",
    "wrongWhy": {
     "nums.size()": "right 多算了1,递归过程中会在某次划分里把 mid 或数组访问推到 nums[nums.size()],造成越界访问(未定义行为/崩溃)。",
     "nums.size() - 2": "right 少算了1,数组最后一个元素永远进不了区间 [left, right],最终构造出的 BST 会漏掉原数组最后一个数字。"
    }
   },
   {
    "id": "p108-bst-base-case",
    "crux": "递归终止条件是 left > right,不是 >= 或 <",
    "answer": "left > right",
    "blankOffset": 208,
    "blankLen": 12,
    "options": [
     "left > right",
     "left >= right",
     "left < right"
    ],
    "why": "区间 [left, right] 为空当且仅当 left > right;当 left == right 时区间恰好还剩一个元素,必须继续建这个节点,不能提前判空。",
    "wrongWhy": {
     "left >= right": "当区间只剩一个元素(left==right)时会被错误地当成空区间直接返回 nullptr,导致这个元素对应的节点丢失,树少一个节点。",
     "left < right": "条件反了:真正区间为空(left>right)时不会终止递归,会继续用非法的 left/right 去算 mid 并访问 nums[mid],造成数组越界。"
    }
   },
   {
    "id": "p108-bst-mid-formula",
    "crux": "mid 用 (left+right)/2 向下取整,取中间偏左的元素作根",
    "answer": "(left + right) / 2",
    "blankOffset": 311,
    "blankLen": 18,
    "options": [
     "(left + right) / 2",
     "(left + right + 1) / 2",
     "left + (right - left) / 2 + 1"
    ],
    "why": "题解约定\"总是选择中间位置左边的数字作为根节点\",C++ 整数除法天然向下取整,(left+right)/2 在区间长度为偶数时恰好取到偏左的那个中位数,保证每次构造结果确定、与参考实现一致。",
    "wrongWhy": {
     "(left + right + 1) / 2": "变成向上取整,区间长度为偶数时会选中间偏右的元素作根,与题解约定的\"偏左\"规则不一致,构造出的树形状与参考实现不同。",
     "left + (right - left) / 2 + 1": "在偏左公式基础上又多加了1,当 left==right 时 mid 会算成 left+1 越过 right,访问 nums[right+1] 造成数组越界崩溃。"
    }
   },
   {
    "id": "p108-bst-left-subtree-bound",
    "crux": "左子树区间的右端必须是 mid-1,跳过已用掉的根节点",
    "answer": "mid - 1",
    "blankOffset": 422,
    "blankLen": 7,
    "options": [
     "mid - 1",
     "mid",
     "mid + 1"
    ],
    "why": "nums[mid] 已经被当前节点占用,左子树只能来自根左边尚未使用的元素,即区间 [left, mid-1]。",
    "wrongWhy": {
     "mid": "左子树区间变成 [left, mid],会把已经用作根的 nums[mid] 重复地再次选为子树的根,且当 left==right==mid 时区间不会缩小,导致无限递归。",
     "mid + 1": "左子树区间变成 [left, mid+1],既重复用了已作为根的 nums[mid]、又把本属右半部分的 nums[mid+1] 拉进来;区间几乎没收缩会导致无限递归、栈溢出。"
    }
   },
   {
    "id": "p108-bst-right-subtree-bound",
    "crux": "右子树区间的左端必须是 mid+1,跳过已用掉的根节点",
    "answer": "mid + 1",
    "blankOffset": 467,
    "blankLen": 7,
    "options": [
     "mid + 1",
     "mid",
     "mid - 1"
    ],
    "why": "nums[mid] 已经被当前节点占用,右子树只能来自根右边尚未使用的元素,即区间 [mid+1, right]。",
    "wrongWhy": {
     "mid": "右子树区间变成 [mid, right],重复使用了已作为根的 nums[mid];当 left==right==mid 时区间不会缩小,导致无限递归(left>right 永远不成立)。",
     "mid - 1": "右子树区间变成 [mid-1, right],重复包含了已作为根的 nums[mid] 和已分给左子树的 nums[mid-1];区间左端几乎没收缩,会像 [0,2] 再次递归到 [0,2] 那样无限递归、栈溢出。"
    }
   }
  ]
 },
 {
  "id": 114,
  "title": "114. 二叉树展开为链表",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给你二叉树的根结点 <code>root</code> ，请你将它展开为一个单链表：</p>\n\n<ul>\n\t<li>展开后的单链表应该同样使用 <code>TreeNode</code> ，其中 <code>right</code> 子指针指向链表中下一个结点，而左子指针始终为 <code>null</code> 。</li>\n\t<li>展开后的单链表应该与二叉树 <a href=\"https://baike.baidu.com/item/%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86/6442839?fr=aladdin\" target=\"_blank\"><strong>先序遍历</strong></a> 顺序相同。</li>\n</ul>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2,5,3,4,null,6]\n<strong>输出：</strong>[1,null,2,null,3,null,4,null,5,null,6]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [0]\n<strong>输出：</strong>[0]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中结点数在范围 <code>[0, 2000]</code> 内</li>\n\t<li><code>-100 <= Node.val <= 100</code></li>\n</ul>\n\n<p> </p>\n\n<p><strong>进阶：</strong>你可以使用原地算法（<code>O(1)</code> 额外空间）展开这棵树吗？</p>",
  "code": "class Solution {\npublic:\n    void flatten(TreeNode* root) {\n        vector<TreeNode*> l;\n        preorderTraversal(root, l);\n        int n = l.size();\n        for (int i = 1; i < n; i++) { // 按前序顺序把相邻节点重连成右斜单链\n            TreeNode *prev = l.at(i - 1), *curr = l.at(i);\n            prev->left = nullptr;\n            prev->right = curr;\n        }\n    }\n\n    void preorderTraversal(TreeNode* root, vector<TreeNode*> &l) {\n        if (root != NULL) {\n            l.push_back(root);\n            preorderTraversal(root->left, l);\n            preorderTraversal(root->right, l);\n        }\n    }\n};",
  "cards": [
   {
    "id": "p114-reconnect-loop-start-index",
    "crux": "重连循环必须从 i=1 开始，保证 i-1 不越界且能连上所有相邻节点对",
    "answer": "1",
    "blankOffset": 172,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "2"
    ],
    "why": "题解要把前序数组里相邻的两个节点顺次接成右斜链，每次用 l.at(i-1) 作为 prev、l.at(i) 作为 curr。要让 prev 第一次取到 l[0]，i 必须从 1 开始；从 1 到 n-1 恰好覆盖全部 n-1 对相邻节点。",
    "wrongWhy": {
     "0": "i=0 时 i-1=-1，l.at(-1) 越界，vector::at 会抛出 out_of_range 异常，程序直接崩溃。",
     "2": "从 2 开始会跳过第一对节点 l[0] 与 l[1] 的连接，导致展开后的链表在开头就断开，丢失一条右指针。"
    }
   },
   {
    "id": "p114-preorder-null-check",
    "crux": "前序遍历递归入口必须判断 root != NULL 才继续访问和递归，方向反了会解引用空指针",
    "answer": "!=",
    "blankOffset": 436,
    "blankLen": 2,
    "options": [
     "!=",
     "==",
     "="
    ],
    "why": "这是递归的终止/继续条件：只有当前节点非空时才应该把它计入前序序列并继续向左右子树递归，root != NULL 正是这个门槛。",
    "wrongWhy": {
     "==": "条件反转后，只有 root 为空时才会执行 push_back(root) 和递归，等于对空指针 push 并继续对 nullptr->left/right 取值，程序直接崩溃；同时所有真正非空的节点都被跳过，遍历结果为空。",
     "=": "= 是赋值运算符而非判等 ==。if (root = NULL) 会把 root 赋值为 NULL，该赋值表达式的值就是 NULL，转成 bool 恒为 false，于是 if 体永不执行、函数不做任何遍历（多数编译器还会对 if 中的赋值发出警告）。"
    }
   },
   {
    "id": "p114-preorder-left-before-right",
    "crux": "前序遍历必须先递归左子树再递归右子树，顺序决定了展开后链表的节点顺序",
    "answer": "root->left",
    "blankOffset": 508,
    "blankLen": 10,
    "options": [
     "root->left",
     "root->right",
     "root"
    ],
    "why": "展开为链表要求新链表节点顺序恰好是原树的前序遍历顺序（根→左→右）。push_back(root) 之后必须先递归 root->left，再递归 root->right，才能保证 vector 里存的顺序与题目要求一致。",
    "wrongWhy": {
     "root->right": "先递归右子树会把遍历顺序变成根→右→左，vector 中节点顺序不再是前序，后续重连出的链表节点顺序也随之错乱。",
     "root": "对 root 自身递归而不是子节点，root 永远非空，导致无限递归直至栈溢出崩溃。"
    }
   },
   {
    "id": "p114-clear-prev-left-pointer",
    "crux": "重连时必须把 prev->left 清空，否则原来的左子树仍挂在树上，树结构不合法",
    "answer": "left",
    "blankOffset": 287,
    "blankLen": 4,
    "options": [
     "left",
     "right"
    ],
    "why": "题目要求展开后的树里每个节点都只有 right 指针、left 必须为空，所以要显式把 prev->left 置为 nullptr；而 prev->right 紧接着会被赋值为 curr，二者互不影响，缺一不可。",
    "wrongWhy": {
     "right": "如果先把 prev->right 置空，紧接着下一行又把 prev->right 赋值为 curr，right 被覆盖看似没问题，但真正需要清空的 prev->left 却从未被处理，原来挂在 prev 上的左子树仍然存在，导致最终树不满足「只有右指针」的要求（left 非空）。"
    }
   }
  ]
 },
 {
  "id": 118,
  "title": "118. 杨辉三角",
  "category": "动态规划",
  "difficulty": "easy",
  "descHtml": "<p>给定一个非负整数&nbsp;<em><code>numRows</code>，</em>生成「杨辉三角」的前&nbsp;<em><code>numRows</code>&nbsp;</em>行。</p>\n\n<p>在<strong>「杨辉三角」</strong>中，每个数是它左上方和右上方的数的和。</p>\n\n<p></p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> numRows = 5\n<strong>输出:</strong> [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> numRows = 1\n<strong>输出:</strong> [[1]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numRows &lt;= 30</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        vector<vector<int>> ret(numRows);\n        for (int i = 0; i < numRows; ++i) {\n            ret[i].resize(i + 1);\n            ret[i][0] = ret[i][i] = 1; // 每行首尾恒为 1\n            for (int j = 1; j < i; ++j) {\n                ret[i][j] = ret[i - 1][j] + ret[i - 1][j - 1]; // 中间元素 = 上一行相邻两数之和\n            }\n        }\n        return ret;\n    }\n};",
  "cards": [
   {
    "id": "p118-resize-i-plus-1",
    "crux": "每行长度必须 resize 成 i+1,少一个就会漏尾部元素或越界",
    "answer": "i + 1",
    "blankOffset": 185,
    "blankLen": 5,
    "options": [
     "i + 1",
     "i",
     "i - 1",
     "numRows"
    ],
    "why": "题解讲解写明「第 i 行有 i+1 个数」,第 i 行(0-indexed)恰好有 i+1 个元素,resize 必须传 i+1,否则后面 ret[i][i]=1 就会越界写入。",
    "wrongWhy": {
     "i": "行长少了1,该行合法下标只到 i-1,随后 ret[i][i]=1 直接越界访问未分配的内存,行为未定义。",
     "i - 1": "行长又少了1个,越界更严重,连中间元素的填充也会越界。",
     "numRows": "把每行都固定成总行数长度,不符合杨辉三角每行元素个数递增的性质,后面下标语义全部错乱。"
    }
   },
   {
    "id": "p118-row-head-tail-assign",
    "crux": "首尾两个位置都要置 1,下标必须是 0 和 i,任何一个写错都会漏掉边界值",
    "answer": "ret[i][0] = ret[i][i]",
    "blankOffset": 205,
    "blankLen": 21,
    "options": [
     "ret[i][0] = ret[i][i]",
     "ret[i][0] = ret[i][i - 1]",
     "ret[i][i] = 1",
     "ret[0][i] = ret[i][i]"
    ],
    "why": "hints 指出「先把每行 resize 成 i+1 个元素,并把首尾置 1」,一行的首元素下标是 0,尾元素下标是 i(因为该行长度为 i+1),两个都要连等赋值为 1。",
    "wrongWhy": {
     "ret[i][0] = ret[i][i - 1]": "尾部下标错位到 i-1,真正的行尾 ret[i][i] 没被赋值,保持 resize 时的默认值 0,导致该行末尾不是 1。",
     "ret[i][i] = 1": "漏掉了首位 ret[i][0]=1 的赋值,该行第一个数会是 0 而不是 1。",
     "ret[0][i] = ret[i][i]": "把行列下标搞反,写到了第 0 行而不是第 i 行,不仅当前行首位没置 1,还会污染第 0 行的数据(且 i>=numRows 时越界)。"
    }
   },
   {
    "id": "p118-inner-loop-init-j",
    "crux": "内层循环必须从 j=1 开始,因为 j=0 的位置已经在首尾赋值里处理过",
    "answer": "j = 1",
    "blankOffset": 265,
    "blankLen": 5,
    "options": [
     "j = 1",
     "j = 0"
    ],
    "why": "首尾(下标 0 和 i)已经在 ret[i][0]=ret[i][i]=1 里处理完毕,中间元素从下标 1 开始才不会覆盖已经算好的首位。",
    "wrongWhy": {
     "j = 0": "会把已经置好的 ret[i][0]=1 用 ret[i-1][0]+ret[i-1][-1] 重新覆盖,其中 ret[i-1][-1] 是越界访问,读到未定义值,导致该行首位不再是 1。"
    }
   },
   {
    "id": "p118-inner-loop-bound-j-lt-i",
    "crux": "内层循环上界必须是 j<i,多循环一次会覆盖尾部 1 并越界读取上一行",
    "answer": "j < i",
    "blankOffset": 272,
    "blankLen": 5,
    "options": [
     "j < i",
     "j <= i",
     "j < i - 1"
    ],
    "why": "solutionText 说明「内层 j 从 1 到 i-1」,即 j 的取值范围是 [1, i-1],循环条件写成 j < i 才能保证 j 最大只到 i-1,不会碰到已经赋过值的尾部下标 i。",
    "wrongWhy": {
     "j <= i": "j 会取到 i,把刚设好的 ret[i][i]=1 用 ret[i-1][i]+ret[i-1][i-1] 覆盖,而 ret[i-1][i] 已经越界(上一行长度只有 i 个元素,合法下标到 i-1),行为未定义。",
     "j < i - 1": "少循环最后一次,导致下标 i-1 位置(行内倒数第二个数)没有被正确计算,仍停留在 resize 时的默认值 0。"
    }
   },
   {
    "id": "p118-transfer-prev-row-indices",
    "crux": "转移方程必须引用上一行(i-1)的 j 和 j-1 两个位置,行号和列偏移都不能错",
    "answer": "ret[i - 1][j] + ret[i - 1][j - 1]",
    "blankOffset": 314,
    "blankLen": 33,
    "options": [
     "ret[i - 1][j] + ret[i - 1][j - 1]",
     "ret[i][j - 1] + ret[i][j]",
     "ret[i - 1][j + 1] + ret[i - 1][j - 1]"
    ],
    "why": "hints 明确给出转移公式 ret[i][j] = ret[i-1][j-1] + ret[i-1][j],中间元素等于上一行相邻两个数之和,必须都引用 i-1 行。",
    "wrongWhy": {
     "ret[i][j - 1] + ret[i][j]": "错误地引用了本行(第 i 行)的数据,而本行的这两个位置在当前 j 之前还没被正确计算(ret[i][j] 甚至就是本次要写的目标,读到的是上一轮循环的中间态或默认值 0),结果完全错误。",
     "ret[i - 1][j + 1] + ret[i - 1][j - 1]": "把 j 错误地写成 j+1,多取了上一行更靠右的一个数,不仅结果错误,当 j=i-1 时 ret[i-1][j+1] 即 ret[i-1][i] 还会越界(上一行合法下标只到 i-1)。"
    }
   }
  ]
 },
 {
  "id": 121,
  "title": "121. 买卖股票的最佳时机",
  "category": "贪心算法",
  "difficulty": "easy",
  "descHtml": "<p>给定一个数组 <code>prices</code> ，它的第 <code>i</code> 个元素 <code>prices[i]</code> 表示一支给定股票第 <code>i</code> 天的价格。</p>\n\n<p>你只能选择 <strong>某一天</strong> 买入这只股票，并选择在 <strong>未来的某一个不同的日子</strong> 卖出该股票。设计一个算法来计算你所能获取的最大利润。</p>\n\n<p>返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 <code>0</code> 。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>[7,1,5,3,6,4]\n<strong>输出：</strong>5\n<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。\n     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>prices = [7,6,4,3,1]\n<strong>输出：</strong>0\n<strong>解释：</strong>在这种情况下, 没有交易完成, 所以最大利润为 0。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= prices.length <= 10<sup>5</sup></code></li>\n\t<li><code>0 <= prices[i] <= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int inf = 1e9;\n        int minprice = inf, maxprofit = 0;\n        for (int price: prices) {\n            maxprofit = max(maxprofit, price - minprice); // 假设在历史最低点买入、今天卖出\n            minprice = min(price, minprice); // 维护到今天为止的历史最低价\n        }\n        return maxprofit;\n    }\n};",
  "cards": [
   {
    "id": "p121-minprice-init-inf",
    "crux": "minprice 初始必须是足够大的哨兵值(如1e9)，不能是0或负数，否则「历史最低价」无法被正确维护，第一天就会更新错误。",
    "answer": "inf",
    "blankOffset": 112,
    "blankLen": 3,
    "options": [
     "inf",
     "0",
     "-inf"
    ],
    "why": "minprice 表示到目前为止的历史最低价，初始设为足够大的哨兵值 1e9，能保证第一天 price 一定小于它、被正确更新为当天价格；这正是 hints 里明确给出的写法。",
    "wrongWhy": {
     "0": "价格恒非负，minprice 初始为0后 min(price,0) 恒保持0，于是 price-minprice 退化成 price 本身，maxprofit 最终等于最高价格而非最大利润，结果偏大错误。",
     "-inf": "负无穷作为最低价初值，min(price,-inf) 永远取 -inf，minprice 永不会被更新为真实价格，price-minprice 变成极大值，答案完全错误。"
    }
   },
   {
    "id": "p121-maxprofit-init-zero",
    "crux": "maxprofit 必须初始化为0，代表“不交易”的基线利润，保证全程下跌时答案正确为0",
    "answer": "0",
    "blankOffset": 129,
    "blankLen": 1,
    "options": [
     "0",
     "inf",
     "prices[0]",
     "-1"
    ],
    "why": "maxprofit 表示当前能获得的最大利润，题目允许“不交易”，即利润下限是0；初始为0能保证股价一路下跌时，maxprofit 始终不会被更新为负数，最终正确返回0，这与 solutionText 中“一路下跌时答案自然为0”一致。",
    "wrongWhy": {
     "inf": "初始为极大值会导致 max(maxprofit, price - minprice) 永远保留这个极大值，无法被真实利润更新，返回值错误地等于1e9",
     "prices[0]": "把利润初始化成价格本身没有意义，且会导致第一次比较时 maxprofit 被错误地设为一个不代表利润的正数，使结果偏大",
     "-1": "初始为负数虽然不会导致原地负值溢出，但若全程价格不变或下跌，用 max 更新后最终结果可能停留在负数而不是题目要求的0，返回值错误"
    }
   },
   {
    "id": "p121-profit-subtraction-direction",
    "crux": "利润必须写成 price - minprice（今天卖出价 减 历史最低买入价），减法方向不能反；写成 minprice - price 得到的是亏损方向，maxprofit 恒为0。",
    "answer": "maxprofit = max(maxprofit, price - minprice); // 假设在历史最低点买入、今天卖出",
    "blankOffset": 178,
    "blankLen": 64,
    "options": [
     "maxprofit = max(maxprofit, price - minprice); // 假设在历史最低点买入、今天卖出",
     "maxprofit = max(maxprofit, minprice - price);"
    ],
    "why": "题解用 price - minprice 表示在历史最低点买入、今天卖出的收益，这是唯一能得到正利润的方向；配合初始 maxprofit=0，全程下跌时自然返回0。（注意：先更新利润还是先更新 minprice 对答案没有影响——同一天买卖利润为0，不改变结果，所以真正的临界点是减法方向，而非先后顺序。）",
    "wrongWhy": {
     "maxprofit = max(maxprofit, minprice - price);": "减法方向写反，计算的是“今天买入、历史最低点卖出”的亏损方向，结果恒为非正数，maxprofit 会一直停留在0，无法得到正确的最大利润"
    }
   }
  ]
 },
 {
  "id": 124,
  "title": "124. 二叉树中的最大路径和",
  "category": "二叉树",
  "difficulty": "hard",
  "descHtml": "<p>二叉树中的<strong> 路径</strong> 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 <strong>至多出现一次</strong> 。该路径<strong> 至少包含一个 </strong>节点，且不一定经过根节点。</p>\n\n<p><strong>路径和</strong> 是路径中各节点值的总和。</p>\n\n<p>给你一个二叉树的根节点 <code>root</code> ，返回其 <strong>最大路径和</strong> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2,3]\n<strong>输出：</strong>6\n<strong>解释：</strong>最优路径是 2 -&gt; 1 -&gt; 3 ，路径和为 2 + 1 + 3 = 6</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [-10,9,20,null,null,15,7]\n<strong>输出：</strong>42\n<strong>解释：</strong>最优路径是 15 -&gt; 20 -&gt; 7 ，路径和为 15 + 20 + 7 = 42\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围是 <code>[1, 3 * 10<sup>4</sup>]</code></li>\n\t<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>\n</ul>",
  "code": "class Solution {\nprivate:\n    int maxSum = INT_MIN;\n\npublic:\n    int maxGain(TreeNode* node) {\n        if (node == nullptr) {\n            return 0;\n        }\n\n        // 递归计算左右子节点的最大贡献值\n        // 只有在最大贡献值大于 0 时，才会选取对应子节点\n        int leftGain = max(maxGain(node->left), 0);\n        int rightGain = max(maxGain(node->right), 0);\n\n        // 节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值\n        int priceNewpath = node->val + leftGain + rightGain;\n\n        // 更新答案\n        maxSum = max(maxSum, priceNewpath);\n\n        // 返回节点的最大贡献值\n        return node->val + max(leftGain, rightGain);\n    }\n\n    int maxPathSum(TreeNode* root) {\n        maxGain(root);\n        return maxSum;\n    }\n};",
  "cards": [
   {
    "id": "p124-maxsum-init-int-min",
    "crux": "全局最大路径和 maxSum 必须初始化为 INT_MIN，而不是 0，否则全负树用例会出错",
    "answer": "INT_MIN",
    "blankOffset": 43,
    "blankLen": 7,
    "options": [
     "INT_MIN",
     "0",
     "INT_MAX",
     "root->val"
    ],
    "why": "题目要求兜住全负树用例：如果整棵树节点值全为负数，正确答案应该是其中最大的那个负数。maxSum 初始为 INT_MIN 才能保证第一次 max(maxSum, priceNewpath) 时被正确更新为真实的（负）路径和。",
    "wrongWhy": {
     "0": "当树中所有节点值都为负时，任何路径和都小于0，但初始值0会一直\"赢过\"所有真实的负数路径和，导致最终返回错误的0而不是真正的最大负数路径和",
     "INT_MAX": "语义相反，INT_MAX 用于求最小值时的初始哨兵；用在这里配合 max() 更新会导致 maxSum 永远停留在 INT_MAX，答案恒错",
     "root->val": "maxSum 是类成员字段，声明处根本没有 root 变量（root 只是 maxPathSum 的参数），且只用根节点值初始化也无法代表整棵树可能出现的更小路径和场景，逻辑上不成立"
    }
   },
   {
    "id": "p124-gain-clamp-zero",
    "crux": "leftGain/rightGain 必须与 0 取 max，舍弃负贡献，而不是直接使用递归返回值",
    "answer": "0",
    "blankOffset": 324,
    "blankLen": 1,
    "options": [
     "0",
     "1",
     "node->val",
     "INT_MIN"
    ],
    "why": "递归返回值可能是负数（该子树对路径和是拖累），此时不如不选这个方向，贡献记为0。与0取max正是实现\"负贡献直接舍弃\"这一关键逻辑的地方。",
    "wrongWhy": {
     "1": "阈值设错，会把返回值为0或-1这类本该被舍弃的贡献错误地保留，导致后续 priceNewpath 和返回值都比正确结果偏大",
     "node->val": "用当前节点的值做下界没有意义，这里比较的对象应该是子树递归返回的贡献值，而非当前节点自身的值，会造成语义混乱和错误结果",
     "INT_MIN": "等于没有钳制下限，负贡献会被完整地加进 priceNewpath 和返回值里，使得答案可能被负数拖累而变小，丢失最优解"
    }
   },
   {
    "id": "p124-return-single-side-gain",
    "crux": "maxGain 的返回值只能选左右两侧贡献中较大的一侧，不能两侧都要，否则破坏\"单侧延伸\"的语义",
    "answer": "max(leftGain, rightGain)",
    "blankOffset": 545,
    "blankLen": 24,
    "options": [
     "max(leftGain, rightGain)",
     "leftGain + rightGain",
     "leftGain",
     "rightGain"
    ],
    "why": "maxGain 的返回值要交给父节点继续往上拼接成一条合法路径，一条路径在某个节点处只能往左或往右延伸一支，不能同时经过左右两个子树（否则会在父节点处再次拐弯，形成非法的分叉/环形路径）。左右都要的逻辑只应出现在更新全局 maxSum 的那一步。",
    "wrongWhy": {
     "leftGain + rightGain": "把左右两侧都返回给父节点，父节点再拼接时相当于把这个节点也当成了一个\"拐点\"，路径变成了非法的分叉形状，导致计算出的路径和偏大且不代表真实存在的路径",
     "leftGain": "永远只考虑左子树贡献，当右子树贡献更大时会漏掉更优的单侧延伸路径，导致返回值和最终答案偏小",
     "rightGain": "永远只考虑右子树贡献，当左子树贡献更大时会漏掉更优的单侧延伸路径，导致返回值和最终答案偏小"
    }
   },
   {
    "id": "p124-null-node-base-case-zero",
    "crux": "空节点的基线返回值必须是 0，代表\"不选择这个方向\"，与外层 max(...,0) 的钳制逻辑呼应",
    "answer": "0",
    "blankOffset": 145,
    "blankLen": 1,
    "options": [
     "0",
     "INT_MIN",
     "node->val",
     "-1"
    ],
    "why": "空节点不存在，也就不产生任何贡献，用0表示\"没有额外贡献\"最自然；配合调用处的 max(maxGain(...), 0) 一起构成完整的负贡献舍弃逻辑。",
    "wrongWhy": {
     "INT_MIN": "会让 node->val + leftGain（当某一侧为空）出现极端负值甚至下溢，且与外层已有的 max(...,0) 钳制逻辑重复冲突，属于多余且危险的写法",
     "node->val": "node 此时是 nullptr，访问 node->val 是对空指针解引用，程序会直接崩溃",
     "-1": "语义错误地引入了一个额外的惩罚值，即使子树不存在也会让路径和被无谓地减1，导致所有涉及空子树的计算都出现微小但真实的偏差"
    }
   }
  ]
 },
 {
  "id": 128,
  "title": "128. 最长连续序列",
  "category": "哈希",
  "difficulty": "medium",
  "descHtml": "<p>给定一个未排序的整数数组 <code>nums</code> ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。</p>\n\n<p>请你设计并实现时间复杂度为&nbsp;<code>O(n)</code><em> </em>的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [100,4,200,1,3,2]\n<strong>输出：</strong>4\n<strong>解释：</strong>最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,3,7,2,5,8,4,6,0,1]\n<strong>输出：</strong>9\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,0,1,2]\n<b>输出：</b>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> num_set;\n        for (const int& num : nums) {\n            num_set.insert(num);\n        }\n\n        int longestStreak = 0;\n\n        for (const int& num : num_set) {\n            if (!num_set.count(num - 1)) { // 只从序列起点出发，保证整体 O(n)\n                int currentNum = num;\n                int currentStreak = 1;\n\n                while (num_set.count(currentNum + 1)) {\n                    currentNum += 1;\n                    currentStreak += 1;\n                }\n\n                longestStreak = max(longestStreak, currentStreak);\n            }\n        }\n\n        return longestStreak;\n    }\n};",
  "cards": [
   {
    "id": "p128-sequence-start-check",
    "crux": "只有当 num-1 不在集合里时才从 num 开始向右扩展，这是把复杂度从 O(n²) 降到 O(n) 的关键剪枝，条件写反或方向写反都会导致重复计算甚至超时",
    "answer": "!num_set.count(num - 1)",
    "blankOffset": 280,
    "blankLen": 23,
    "options": [
     "!num_set.count(num - 1)",
     "num_set.count(num - 1)",
     "!num_set.count(num + 1)"
    ],
    "why": "solutionText 明确指出：只有 num-1 不在集合中（即 num 是一段连续序列的起点）才向右扩展；这一剪枝保证每个数只会作为“起点”被扩展一次，整体复杂度 O(n)。",
    "wrongWhy": {
     "num_set.count(num - 1)": "漏掉了取反 !，条件变成“num-1 存在时才扩展”，恰好和起点判定相反，会让非起点的数也重复触发向右扩展，退化为 O(n²) 超时（hints 中明确提到没有起点剪枝会超时）",
     "!num_set.count(num + 1)": "把方向写反成判断右边而不是左边，无法正确识别“序列起点”，会导致有的起点被跳过、有的非起点被误当成起点重复扩展，结果错误且仍可能退化为 O(n²)"
    }
   },
   {
    "id": "p128-current-streak-init",
    "crux": "currentStreak 的初始值必须是 1，因为起点 num 自身就已经构成长度为 1 的序列，初始化成 0 会让最终统计的最长长度整体少 1",
    "answer": "1",
    "blankOffset": 403,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "num"
    ],
    "why": "currentNum 从 num 本身开始，num 自己就是这段连续序列的第一个元素，所以长度应从 1 计起；之后每向右扩展一个数才 currentStreak += 1。",
    "wrongWhy": {
     "0": "把起点自身漏计了，即使后续 while 循环正确累加，最终 currentStreak 也会比真实序列长度少 1，导致 longestStreak 偏小",
     "num": "把序列长度和序列的数值混为一谈，currentStreak 应该是“计数”而不是当前数值，赋成 num 会使长度和数值大小绑定，结果完全错误"
    }
   },
   {
    "id": "p128-streak-extend-direction",
    "crux": "while 循环必须查询 currentNum + 1 是否在集合中，方向反了或漏加偏移都会让扩展逻辑失效甚至死循环",
    "answer": "currentNum + 1",
    "blankOffset": 444,
    "blankLen": 14,
    "options": [
     "currentNum + 1",
     "currentNum - 1",
     "currentNum"
    ],
    "why": "题解要求从起点向右不断查找下一个连续数 currentNum+1 是否存在，一旦存在就把 currentNum 向右推进一位并累加长度，直到序列断开。",
    "wrongWhy": {
     "currentNum - 1": "方向反了，去检查已经确认不存在（起点左边）的方向，要么循环体一次都进不去（因为起点定义就是 num-1 不存在），要么在非起点误用时产生错误的扩展方向，统计结果不再是“向右连续长度”",
     "currentNum": "漏掉了 +1 偏移，只要 currentNum 本身还在集合里（它当然在，因为集合就是从它自己插入的），条件恒为真，循环永远不会退出，程序死循环"
    }
   }
  ]
 },
 {
  "id": 131,
  "title": "131. 分割回文串",
  "category": "回溯",
  "difficulty": "medium",
  "descHtml": "<p>给你一个字符串 <code>s</code>，请你将<em> </em><code>s</code><em> </em>分割成一些 <span data-keyword=\"substring-nonempty\">子串</span>，使每个子串都是 <strong><span data-keyword=\"palindrome-string\">回文串</span></strong> 。返回 <code>s</code> 所有可能的分割方案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"aab\"\n<strong>输出：</strong>[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"a\"\n<strong>输出：</strong>[[\"a\"]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 16</code></li>\n\t<li><code>s</code> 仅由小写英文字母组成</li>\n</ul>",
  "code": "class Solution {\nprivate:\n    vector<vector<int>> f;\n    vector<vector<string>> ret;\n    vector<string> ans;\n    int n;\n\npublic:\n    void dfs(const string& s, int i) {\n        if (i == n) {\n            ret.push_back(ans);\n            return;\n        }\n        for (int j = i; j < n; ++j) {\n            if (f[i][j]) {\n                ans.push_back(s.substr(i, j - i + 1));\n                dfs(s, j + 1);\n                ans.pop_back();\n            }\n        }\n    }\n\n    vector<vector<string>> partition(string s) {\n        n = s.size();\n        f.assign(n, vector<int>(n, true));\n\n        for (int i = n - 1; i >= 0; --i) {\n            for (int j = i + 1; j < n; ++j) {\n                f[i][j] = (s[i] == s[j]) && f[i + 1][j - 1]; // i 倒序填表，保证 f[i+1][j-1] 已算好\n            }\n        }\n\n        dfs(s, 0);\n        return ret;\n    }\n};",
  "cards": [
   {
    "id": "p131-j-loop-start-at-i",
    "crux": "内层枚举下一刀切点j时,起点必须是i本身(允许单字符切割),不能从i+1开始",
    "answer": "i",
    "blankOffset": 273,
    "blankLen": 1,
    "options": [
     "i",
     "i + 1",
     "0",
     "i - 1"
    ],
    "why": "枚举的是\"以i为起点的下一段该切多长\",必须允许最短长度1的切法(即s[i]自己单独成一段,f[i][i]恒为回文),所以j要从i本身开始遍历。",
    "wrongWhy": {
     "0": "j会从0重新扫描,访问与当前i毫无关系的f[0][...]区间,枚举逻辑完全错乱,还会重复处理前缀。",
     "i + 1": "会跳过长度为1的切割方案(单字符自己作为一段),导致某些合法分割路径(如包含单字符段的组合)在回溯里永远枚举不到,漏解。",
     "i - 1": "当i=0时j初值为-1,访问f[-1][j]数组越界,直接导致未定义行为/崩溃。"
    }
   },
   {
    "id": "p131-j-loop-end-at-n",
    "crux": "j的上界必须是n(循环条件j<n),覆盖到最后一个字符下标n-1,不能少一个也不能多一个",
    "answer": "n",
    "blankOffset": 280,
    "blankLen": 1,
    "options": [
     "n",
     "n - 1",
     "n + 1"
    ],
    "why": "j必须能取到n-1(最后一个下标),这样才能把最后一个字符纳入某段切割,循环条件写成j<n恰好覆盖0..n-1。",
    "wrongWhy": {
     "n - 1": "j最大只能取到n-2,少枚举了j=n-1这一档,导致所有包含字符串最后一位的分割方案都被漏掉。",
     "n + 1": "j会取到n,访问f[i][n]越界(f的合法列下标是0..n-1),且s.substr(i, n-i+1)请求长度超出字符串实际长度,行为未定义。"
    }
   },
   {
    "id": "p131-f-init-default-true",
    "crux": "f表必须初始化为true,因为长度<=2的短区间(f[i][i]、递推里用到的f[i+1][j-1]当j=i+1时)从不会被双重循环显式赋值,只能靠初始值兜底为回文",
    "answer": "true",
    "blankOffset": 572,
    "blankLen": 4,
    "options": [
     "true",
     "false",
     "0"
    ],
    "why": "内层循环从j=i+1开始,f[i][i]这种对角线格子永远不会被循环体赋值;同时递推式里j=i+1时用到的f[i+1][j-1]=f[i+1][i],其行标i+1大于列标i,同样落在循环从未触达的位置,这些格子必须初始化为true才能让长度1、2的子串被正确判为回文。",
    "wrongWhy": {
     "0": "vector<int>里0等价于false,效果和false一样,短区间被误判为非回文,DP表整体错误。",
     "false": "所有长度<=1和长度为2且未被显式赋值的短区间会被误判为非回文,导致回溯递归永远找不到最短切割,partition结果大面积丢失甚至为空。"
    }
   },
   {
    "id": "p131-dp-recurrence-shrink",
    "crux": "回文DP的转移必须同时收缩左右边界为f[i+1][j-1],只收缩一边或方向搞反都会让判断依据错误的子区间",
    "answer": "f[i + 1][j - 1]",
    "blankOffset": 714,
    "blankLen": 15,
    "options": [
     "f[i + 1][j - 1]",
     "f[i][j - 1]",
     "f[i + 1][j]",
     "f[i - 1][j + 1]"
    ],
    "why": "s[i..j]是回文,当且仅当两端字符相等且去掉首尾后的内部子串s[i+1..j-1]也是回文,所以状态转移必须把左右边界同时收缩一位,对应f[i+1][j-1]。",
    "wrongWhy": {
     "f[i][j - 1]": "左边界没有收缩,比较的其实是s[i..j-1]而不是去掉首尾的内部子串,语义错位,回文判断结果错误。",
     "f[i + 1][j]": "右边界没有收缩,比较的是s[i+1..j],同样不是去掉首尾的内部子串,判断错误。",
     "f[i - 1][j + 1]": "收缩方向反了,区间反而向外扩大而不是缩小,且i=0时i-1越界访问,行为未定义。"
    }
   },
   {
    "id": "p131-outer-loop-reverse-order",
    "crux": "外层i必须从n-1倒序遍历到0,这样计算f[i][j]依赖的f[i+1][j-1](行标更大)才已经算好;正序遍历会用到还没算的值",
    "answer": "n - 1",
    "blankOffset": 602,
    "blankLen": 5,
    "options": [
     "n - 1",
     "0",
     "n"
    ],
    "why": "递推式f[i][j]依赖行标更大的f[i+1][j-1],要保证用到时已经算好,i就必须从n-1倒序减到0,这是区间DP填表顺序的关键。",
    "wrongWhy": {
     "0": "i初值为0再配合'i >= 0; --i'的写法,第一次自减就变成-1直接跳出循环,外层循环实际只执行一次(i=0这一轮),整个表几乎没被填,f全靠初始化值,DP形同虚设。",
     "n": "i=n时访问f[n][j]行下标越界(f的合法行是0..n-1),第一次进入内层循环就是未定义行为。"
    }
   },
   {
    "id": "p131-dfs-recursion-next-index",
    "crux": "当前这一刀切在[i,j],递归进入下一层时必须从j+1开始,不能停在j或跳到i+1",
    "answer": "j + 1",
    "blankOffset": 395,
    "blankLen": 5,
    "options": [
     "j + 1",
     "j",
     "i + 1"
    ],
    "why": "当前段已经把s[i..j]切下,下一段必须从j+1开始接着搜索,这样各段之间既不重叠也不遗漏字符,最终i==n时才能收集到完整覆盖整个字符串的方案。",
    "wrongWhy": {
     "j": "下一层递归又从j开始,会把刚被选中的字符j重复纳入下一段的起点,导致同一字符被重复使用,产生错误方案甚至死循环。",
     "i + 1": "完全没跳过被选中的[i,j]这一段,下一层从i+1(而不是j+1)开始搜索,遗漏了i+1到j之间原本已经被消耗的字符,当j>i时会导致重复枚举或永远到不了i==n的终止条件。"
    }
   }
  ]
 },
 {
  "id": 138,
  "title": "138. 随机链表的复制",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给你一个长度为 <code>n</code> 的链表，每个节点包含一个额外增加的随机指针 <code>random</code> ，该指针可以指向链表中的任何节点或空节点。</p>\n\n<p>构造这个链表的&nbsp;<strong><a href=\"https://baike.baidu.com/item/深拷贝/22785317?fr=aladdin\" target=\"_blank\">深拷贝</a></strong>。&nbsp;深拷贝应该正好由 <code>n</code> 个 <strong>全新</strong> 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 <code>next</code> 指针和 <code>random</code> 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。<strong>复制链表中的指针都不应指向原链表中的节点 </strong>。</p>\n\n<p>例如，如果原链表中有 <code>X</code> 和 <code>Y</code> 两个节点，其中 <code>X.random --&gt; Y</code> 。那么在复制链表中对应的两个节点 <code>x</code> 和 <code>y</code> ，同样有 <code>x.random --&gt; y</code> 。</p>\n\n<p>返回复制链表的头节点。</p>\n\n<p>用一个由&nbsp;<code>n</code>&nbsp;个节点组成的链表来表示输入/输出中的链表。每个节点用一个&nbsp;<code>[val, random_index]</code>&nbsp;表示：</p>\n\n<ul>\n\t<li><code>val</code>：一个表示&nbsp;<code>Node.val</code>&nbsp;的整数。</li>\n\t<li><code>random_index</code>：随机指针指向的节点索引（范围从&nbsp;<code>0</code>&nbsp;到&nbsp;<code>n-1</code>）；如果不指向任何节点，则为&nbsp;&nbsp;<code>null</code>&nbsp;。</li>\n</ul>\n\n<p>你的代码 <strong>只</strong> 接受原链表的头节点 <code>head</code> 作为传入参数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\n<strong>输出：</strong>[[7,null],[13,0],[11,4],[10,2],[1,0]]\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [[1,1],[2,1]]\n<strong>输出：</strong>[[1,1],[2,1]]\n</pre>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<p><strong></strong></p>\n\n<pre>\n<strong>输入：</strong>head = [[3,null],[3,0],[3,null]]\n<strong>输出：</strong>[[3,null],[3,0],[3,null]]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>0 &lt;= n &lt;= 1000</code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n\t<li><code>Node.random</code>&nbsp;为&nbsp;<code>null</code> 或指向链表中的节点。</li>\n</ul>\n\n<p>&nbsp;</p>",
  "code": "class Solution {\npublic:\n    unordered_map<Node*, Node*> cachedNode;\n\n    Node* copyRandomList(Node* head) {\n        if (head == nullptr) {\n            return nullptr;\n        }\n        if (!cachedNode.count(head)) {\n            Node* headNew = new Node(head->val);\n            cachedNode[head] = headNew; // 先存表再递归，防止 random 成环导致无限递归/重复拷贝\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);\n        }\n        return cachedNode[head];\n    }\n};",
  "cards": [
   {
    "id": "p138-138-store-before-recurse",
    "crux": "必须先把新节点存入哈希表，再递归拷贝 next/random；顺序反了会在 random 成环时无限递归。",
    "answer": "cachedNode[head] = headNew; // 先存表再递归，防止 random 成环导致无限递归/重复拷贝\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);",
    "blankOffset": 278,
    "blankLen": 177,
    "options": [
     "cachedNode[head] = headNew; // 先存表再递归，防止 random 成环导致无限递归/重复拷贝\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);",
     "headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);\n            cachedNode[head] = headNew;",
     "headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);",
     "cachedNode[headNew] = head;\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);"
    ],
    "why": "solutionText 明确指出：因为 random 可能指向任意节点甚至成环，「先存表、后递归」是保证每个节点只拷贝一次、不无限递归的关键——headNew 一旦创建就必须立刻登记到 cachedNode，这样递归到成环节点时 count(head) 已为真，会直接返回缓存而不再往下递归。",
    "wrongWhy": {
     "headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);\n            cachedNode[head] = headNew;": "把存表放到两次递归之后：如果某个节点的 random（或链路上某节点的 random）最终指向 head 自身形成环，递归回到 head 时 cachedNode.count(head) 仍是 false（因为还没执行到存表那行），会再次新建 Node 并无限递归，最终栈溢出。",
     "headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);": "完全遗漏存表这一步：cachedNode 永远不会被填充，count(head) 永远为 false，任何环都会导致无限递归；即使没有环，最后 return cachedNode[head] 也会因未插入而返回默认构造的空指针，得到错误结果。",
     "cachedNode[headNew] = head;\n            headNew->next = copyRandomList(head->next);\n            headNew->random = copyRandomList(head->random);": "键值方向写反：应记录「原节点→拷贝节点」（cachedNode[head] = headNew），后续查找都是用原节点 head 去查缓存；反过来存成 cachedNode[headNew] = head 后，cachedNode.count(head) 和 return cachedNode[head] 都查不到正确映射，逻辑完全失效。"
    }
   }
  ]
 },
 {
  "id": 139,
  "title": "139. 单词拆分",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个字符串 <code>s</code> 和一个字符串列表 <code>wordDict</code> 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 <code>s</code>&nbsp;则返回 <code>true</code>。</p>\n\n<p><strong>注意：</strong>不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"leetcode\", wordDict = [\"leet\", \"code\"]\n<strong>输出:</strong> true\n<strong>解释:</strong> 返回 true 因为 \"leetcode\" 可以由 \"leet\" 和 \"code\" 拼接成。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"applepenapple\", wordDict = [\"apple\", \"pen\"]\n<strong>输出:</strong> true\n<strong>解释:</strong> 返回 true 因为 \"applepenapple\" 可以由 \"apple\" \"pen\" \"apple\" 拼接成。\n&nbsp;    注意，你可以重复使用字典中的单词。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入:</strong> s = \"catsandog\", wordDict = [\"cats\", \"dog\", \"sand\", \"and\", \"cat\"]\n<strong>输出:</strong> false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 300</code></li>\n\t<li><code>1 &lt;= wordDict.length &lt;= 1000</code></li>\n\t<li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li>\n\t<li><code>s</code> 和 <code>wordDict[i]</code> 仅由小写英文字母组成</li>\n\t<li><code>wordDict</code> 中的所有字符串 <strong>互不相同</strong></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        auto wordDictSet = unordered_set <string> ();\n        for (auto word: wordDict) {\n            wordDictSet.insert(word);\n        }\n\n        auto dp = vector <bool> (s.size() + 1);\n        dp[0] = true; // 空串视为可拆分\n        for (int i = 1; i <= s.size(); ++i) {\n            for (int j = 0; j < i; ++j) {\n                if (dp[j] && wordDictSet.find(s.substr(j, i - j)) != wordDictSet.end()) { // 前 j 个可拆，且末段 s[j..i) 是字典单词\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n\n        return dp[s.size()];\n    }\n};",
  "cards": [
   {
    "id": "p139-dp0-init-true",
    "crux": "dp[0] 必须初始化为 true，代表空前缀视为可拆分，是所有转移的起点",
    "answer": "dp[0] = true;",
    "blankOffset": 277,
    "blankLen": 13,
    "options": [
     "dp[0] = true;",
     "dp[0] = false;",
     "dp[1] = true;"
    ],
    "why": "solutionText 明确『边界 dp[0]=true』：空串天然可以被拆成 0 个单词，是递推链的起点；若不设为 true，所有依赖 dp[0] 的转移都判定不出第一个真正的字典单词前缀。",
    "wrongWhy": {
     "dp[0] = false;": "把空前缀视为不可拆分，导致即便 s 的前若干字符恰好是一个完整字典单词，转移条件 dp[j] && ... 中 j=0 也判为假，整条递推链断掉，永远算不出 dp[i]=true。",
     "dp[1] = true;": "误把边界设在下标 1 而不是 0，dp[0] 仍是默认值（vector<bool> 默认初始化为 false），导致以整个字符串开头的第一个单词永远无法被识别为『前 0 个已拆完』，同样使递推失效。"
    }
   },
   {
    "id": "p139-outer-loop-le-size",
    "crux": "外层循环上界必须是 i <= s.size()（闭区间），否则永远算不到 dp[s.size()] 这个最终答案",
    "answer": "i <= s.size()",
    "blankOffset": 326,
    "blankLen": 13,
    "options": [
     "i <= s.size()",
     "i < s.size()",
     "i <= s.size() - 1"
    ],
    "why": "dp[i] 表示『前 i 个字符能否拆分』，最终要返回的答案是 dp[s.size()]（整串），所以 i 必须能取到 s.size() 这个值，循环条件应为闭区间 i <= s.size()。",
    "wrongWhy": {
     "i < s.size()": "循环体内 i 最大只能到 s.size()-1，dp[s.size()] 永远不会被计算，最后 return dp[s.size()] 读到的是未赋值的默认 false，函数恒返回 false（除非 s 为空）。",
     "i <= s.size() - 1": "等价于 i < s.size()（且当 s 为空字符串时 s.size()-1 是 size_t 下溢变成极大值，引发越界或死循环），同样漏算 dp[s.size()]，导致答案恒错。"
    }
   },
   {
    "id": "p139-substr-length-i-minus-j",
    "crux": "substr 的第二个参数（长度）必须是 i - j，表示末段 s[j..i) 的长度",
    "answer": "i - j",
    "blankOffset": 448,
    "blankLen": 5,
    "options": [
     "i - j",
     "i",
     "j - i"
    ],
    "why": "s.substr(起点, 长度) 中末段是从下标 j 开始、到下标 i（不含）结束，长度应为 i - j；solutionText 写明『末段 s[j..i) 是字典单词』。",
    "wrongWhy": {
     "i": "把长度错写成 i（本应是 i-j）：substr 会从下标 j 起截取 i 个字符（长度超出剩余时自动截到串尾、不会抛异常），得到的子串比正确末段 s[j..i) 更长、内容不同，因而查字典基本查不到对应单词，转移条件恒为假，判断失效。",
     "j - i": "j < i 时 j - i 是负数，substr 的长度参数是无符号类型，负数会被转换成一个极大的无符号值，导致截取从 j 到字符串末尾的全部剩余字符（而非精确的末段），查字典结果完全错误。"
    }
   }
  ]
 },
 {
  "id": 141,
  "title": "141. 环形链表",
  "category": "链表",
  "difficulty": "easy",
  "descHtml": "<p>给你一个链表的头节点 <code>head</code> ，判断链表中是否有环。</p>\n\n<p>如果链表中有某个节点，可以通过连续跟踪 <code>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（索引从 0 开始）。<strong>注意：<code>pos</code> 不作为参数进行传递&nbsp;</strong>。仅仅是为了标识链表的实际情况。</p>\n\n<p><em>如果链表中存在环</em>&nbsp;，则返回 <code>true</code> 。 否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [3,2,0,-4], pos = 1\n<strong>输出：</strong>true\n<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], pos = 0\n<strong>输出：</strong>true\n<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [1], pos = -1\n<strong>输出：</strong>false\n<strong>解释：</strong>链表中没有环。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围是 <code>[0, 10<sup>4</sup>]</code></li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> 为 <code>-1</code> 或者链表中的一个 <strong>有效索引</strong> 。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能用 <code>O(1)</code>（即，常量）内存解决此问题吗？</p>",
  "code": "class Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        if (head == nullptr || head->next == nullptr) {\n            return false;\n        }\n        ListNode* slow = head;\n        ListNode* fast = head->next;\n        while (slow != fast) {\n            if (fast == nullptr || fast->next == nullptr) {\n                return false;\n            }\n            slow = slow->next;\n            fast = fast->next->next; // 快指针每次两步，有环时相对慢指针每步逼近 1，必相遇\n        }\n        return true;\n    }\n};",
  "cards": [
   {
    "id": "p141-fast-initial-one-step-ahead",
    "crux": "fast 指针的起点必须是 head->next，而不是 head",
    "answer": "head->next",
    "blankOffset": 209,
    "blankLen": 10,
    "options": [
     "head->next",
     "head",
     "head->next->next"
    ],
    "why": "题解明确本写法让 fast 从 head->next 出发（比 slow 提前一步），配合循环条件 slow != fast 才能正确启动追及过程；这也是为什么进循环前要先排除空链表和单节点。",
    "wrongWhy": {
     "head": "若 fast 和 slow 同为 head，则 slow != fast 一开始就为假，循环体一次都不执行直接 return true，对无环链表也会误判为有环。",
     "head->next->next": "这里 head 与 head->next 已被前面的卫语句保证非空，写 head->next->next 并不会崩溃，但它让 fast 一开始就领先 slow 两步，破坏了题解『fast 从 head->next 出发、恰好领先一步』的起始不变量，与官方写法不一致，追及推理不再成立。"
    }
   },
   {
    "id": "p141-fast-two-steps-per-iteration",
    "crux": "fast 每轮必须走两步 fast->next->next，制造相对速度 1 的追及",
    "answer": "fast->next->next",
    "blankOffset": 406,
    "blankLen": 16,
    "options": [
     "fast->next->next",
     "fast->next",
     "fast->next->next->next"
    ],
    "why": "题解和提示都强调 slow 走 1 步、fast 走 2 步，这样有环时 fast 相对 slow 每轮缩短 1 的差距，才能保证有限步内相遇；这是 Floyd 判圈算法成立的核心。",
    "wrongWhy": {
     "fast->next": "fast 和 slow 变成同速，若两者已经不重合就会永远保持相同的相对距离，有环时也追不上，陷入死循环。",
     "fast->next->next->next": "fast 每轮走三步，相对速度变成 2，若环长与间距奇偶不配会一步跨过对方而永不相等，且一次连取三个 next 更容易越过末尾触发空指针访问，与题解『逼近 1』的推理不符。"
    }
   },
   {
    "id": "p141-null-check-order-fast-before-next",
    "crux": "判空必须先查 fast == nullptr，再查 fast->next == nullptr，短路顺序不能换、也不能用 &&",
    "answer": "fast == nullptr || fast->next == nullptr",
    "blankOffset": 268,
    "blankLen": 40,
    "options": [
     "fast == nullptr || fast->next == nullptr",
     "fast->next == nullptr || fast == nullptr",
     "fast == nullptr && fast->next == nullptr"
    ],
    "why": "提示中写明循环内先判 fast 或 fast->next 为空就返回 false；利用 || 的短路特性，先判 fast == nullptr，一旦成立就不再计算 fast->next，避免对空指针取 next 而崩溃。",
    "wrongWhy": {
     "fast->next == nullptr || fast == nullptr": "顺序颠倒后，当 fast 本身就是 nullptr 时会先计算 fast->next，对空指针取成员导致程序崩溃（无环链表走到末尾时必然触发）。",
     "fast == nullptr && fast->next == nullptr": "&& 要求两个条件同时成立才判空，但当 fast == nullptr 为真时仍会继续求值 fast->next 导致空指针解引用崩溃；即便不崩溃，语义上也无法在 fast 单独为空时提前返回 false。"
    }
   },
   {
    "id": "p141-loop-condition-not-equal",
    "crux": "循环条件必须是 slow != fast（指针不等就继续追），不能写反或改比较对象",
    "answer": "slow != fast",
    "blankOffset": 236,
    "blankLen": 12,
    "options": [
     "slow != fast",
     "slow == fast",
     "slow->val != fast->val"
    ],
    "why": "题解说明本写法用 slow != fast 作循环条件：只要两指针还没相遇就继续追赶，一旦相等（相遇）说明有环，循环自然退出并返回 true。",
    "wrongWhy": {
     "slow == fast": "条件取反后逻辑完全颠倒：一开始 slow 和 fast 不相等，循环体直接被跳过，函数会在没有真正追及判断的情况下直接走到 return true，对无环链表也会误判。",
     "slow->val != fast->val": "比较的是节点值而不是指针地址，若链表中存在值重复的节点，会在指针尚未真正相遇时就误判为“相遇”，导致有环判断出现假阳性。"
    }
   },
   {
    "id": "p141-empty-and-single-node-guard",
    "crux": "进入循环前必须先排除空链表和单节点，且判空顺序/逻辑符不能写错",
    "answer": "head == nullptr || head->next == nullptr",
    "blankOffset": 73,
    "blankLen": 40,
    "options": [
     "head == nullptr || head->next == nullptr",
     "head->next == nullptr || head == nullptr",
     "head == nullptr && head->next == nullptr"
    ],
    "why": "题解强调因为 fast 要从 head->next 出发，所以必须先把空链表（head 为空）和单节点（head->next 为空）两种会导致 head->next 越界的情形直接返回 false，且靠 || 的短路先判 head == nullptr 来避免对空指针取 next。",
    "wrongWhy": {
     "head->next == nullptr || head == nullptr": "顺序颠倒后，当链表为空（head 为 nullptr）时会先计算 head->next，对空指针取成员直接崩溃。",
     "head == nullptr && head->next == nullptr": "&& 要求两个条件同时为真才拦截：当 head 为空时，&& 仍会继续求值 head->next 导致对空指针解引用崩溃；同时单节点链表（head 非空但 head->next 为空）也无法被单独拦截。"
    }
   }
  ]
 },
 {
  "id": 142,
  "title": "142. 环形链表 II",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给定一个链表的头节点 &nbsp;<code>head</code>&nbsp;，返回链表开始入环的第一个节点。&nbsp;<em>如果链表无环，则返回&nbsp;<code>null</code>。</em></p>\n\n<p>如果链表中有某个节点，可以通过连续跟踪 <code>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（<strong>索引从 0 开始</strong>）。如果 <code>pos</code> 是 <code>-1</code>，则在该链表中没有环。<strong>注意：<code>pos</code> 不作为参数进行传递</strong>，仅仅是为了标识链表的实际情况。</p>\n\n<p><strong>不允许修改 </strong>链表。</p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [3,2,0,-4], pos = 1\n<strong>输出：</strong>返回索引为 1 的链表节点\n<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。\n</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2], pos = 0\n<strong>输出：</strong>返回索引为 0 的链表节点\n<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>head = [1], pos = -1\n<strong>输出：</strong>返回 null\n<strong>解释：</strong>链表中没有环。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>pos</code> 的值为 <code>-1</code> 或者链表中的一个有效索引</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你是否可以使用 <code>O(1)</code> 空间解决此题？</p>",
  "code": "class Solution {\npublic:\n    ListNode *detectCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast != nullptr) {\n            slow = slow->next;\n            if (fast->next == nullptr) {\n                return nullptr;\n            }\n            fast = fast->next->next;\n            if (fast == slow) {\n                ListNode *ptr = head; // 相遇后：从头出发的指针与 slow 同速走，恰在入环口相遇\n                while (ptr != slow) {\n                    ptr = ptr->next;\n                    slow = slow->next;\n                }\n                return ptr;\n            }\n        }\n        return nullptr;\n    }\n};",
  "cards": [
   {
    "id": "p142-fast-move-two-steps",
    "crux": "快指针每次要走两步（fast->next->next），走错步数会导致永远追不上或错过相遇",
    "answer": "fast->next->next",
    "blankOffset": 285,
    "blankLen": 16,
    "options": [
     "fast->next->next",
     "fast->next",
     "fast->next->next->next",
     "slow->next->next"
    ],
    "why": "快慢指针判环的核心是 fast 每轮比 slow 多走一步（fast 走 2 步、slow 走 1 步），二者步差为 1，若有环必在环内相遇；本行正是让 fast 一次跳过两个节点。",
    "wrongWhy": {
     "fast->next": "fast 退化为每次只走一步，与 slow 步速相同；又因每轮循环里 slow 先走一步、fast 紧接着也走一步，二者始终停在同一节点，第一轮就会 fast==slow 触发假相遇，把任意链表（无论有没有环）都误判为有环并直接进入第二阶段，结果全错",
     "fast->next->next->next": "fast 变成一次走三步，与 slow 的步差变成 2，当环长使得步差 2 无法整除对齐时，两指针会在环内互相跳过、永不重合，导致有环却检测不出来",
     "slow->next->next": "把本该移动 fast 的语句写成移动 slow，fast 这一步实际未被更新，后续 fast 的位置逻辑全乱，判环和找入口都会出错"
    }
   },
   {
    "id": "p142-fast-next-null-check",
    "crux": "移动 fast 两步前，必须先判断 fast->next 是否为空，防止访问空指针",
    "answer": "fast->next",
    "blankOffset": 195,
    "blankLen": 10,
    "options": [
     "fast->next",
     "fast",
     "fast->next->next",
     "slow->next"
    ],
    "why": "while 循环条件只保证了 fast 不为空，但下一行要执行 fast->next->next，必须额外确认 fast->next 也不为空，否则会在 fast->next 为空时对空指针解引用取 ->next 而崩溃。",
    "wrongWhy": {
     "fast": "while (fast != nullptr) 已经保证过 fast 非空，这里再判断 fast==nullptr 恒为假、形同虚设，无法拦截 fast->next 为空的情况，之后 fast->next->next 依旧会空指针崩溃",
     "fast->next->next": "此时还没执行赋值，若 fast->next 本身就是 nullptr，写 fast->next->next 会先对 nullptr 取 ->next，判断语句本身就会崩溃，起不到保护作用",
     "slow->next": "判断的是慢指针而不是即将走两步的快指针，跟 fast 是否能安全走两步毫无关系，无法防止 fast->next->next 越界"
    }
   },
   {
    "id": "p142-second-phase-ptr-from-head",
    "crux": "第二阶段必须让新指针从 head（而不是 slow/fast）出发，才能利用 a=c+(n-1)(b+c) 的性质在入环口相遇",
    "answer": "head",
    "blankOffset": 367,
    "blankLen": 4,
    "options": [
     "head",
     "slow",
     "fast",
     "slow->next"
    ],
    "why": "题解结论建立在“头到入环口的距离 a 等于相遇点沿环走回入环口的距离 c（加若干整圈）”这一性质上，该性质要求新指针必须从链表头 head 出发，与 slow 同速前进，二者才会恰好在入环口相遇。",
    "wrongWhy": {
     "slow": "slow 就是相遇点本身，ptr 起点与 slow 重合，等于没有引入 head 到入环口这段路径 a，二者会立即判定相等，直接返回相遇点而非真正的入环口",
     "fast": "相遇时 fast 与 slow 位置相同，起点同样退化为相遇点而非 head，数学关系不成立，得到的还是相遇点而不是入环口",
     "slow->next": "起点相当于从相遇点偏移一位出发，不再是 head 到入环口的真实距离 a，与 slow 同速前进也无法保证恰好在入环口重合，返回的位置会偏差"
    }
   },
   {
    "id": "p142-second-phase-loop-until-equal",
    "crux": "第二阶段循环要在 ptr 与 slow 不相等时持续前进，条件写反会导致循环体一次都不执行",
    "answer": "ptr != slow",
    "blankOffset": 429,
    "blankLen": 11,
    "options": [
     "ptr != slow",
     "ptr == slow",
     "ptr->next != slow",
     "ptr <= slow"
    ],
    "why": "需要不断同步前进直到二者真正相遇（相等）才停下，因此循环条件应是“不相等就继续走”；ptr 初始为 head，与相遇点 slow 通常不同，必须靠这个条件驱动它们一起走到入环口。",
    "wrongWhy": {
     "ptr == slow": "条件写反：初始 ptr(head) 与 slow(相遇点) 通常不相等，条件立即为假，循环体完全不执行，直接把未移动的 head 当作入环口返回，结果几乎总是错的（除非入环口恰好就是 head）",
     "ptr->next != slow": "判断多看了一步，会在 ptr 的下一个节点等于 slow 时就提前停止，导致返回的节点是正确入环口的前一个节点，结果整体偏移一位",
     "ptr <= slow": "指针之间的大小比较只是裸地址比较，与链表节点在环上的逻辑位置毫无关系，无法表达“是否走到同一节点”这一终止语义，属于逻辑错误的写法"
    }
   }
  ]
 },
 {
  "id": 146,
  "title": "146. LRU 缓存",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<div class=\"title__3Vvk\">请你设计并实现一个满足&nbsp; <a href=\"https://baike.baidu.com/item/LRU\" target=\"_blank\">LRU (最近最少使用) 缓存</a> 约束的数据结构。</div>\n\n<div class=\"title__3Vvk\">实现 <code>LRUCache</code> 类：</div>\n\n<div class=\"original__bRMd\">\n<div>\n<ul>\n\t<li><code>LRUCache(int capacity)</code> 以 <strong>正整数</strong> 作为容量&nbsp;<code>capacity</code> 初始化 LRU 缓存</li>\n\t<li><code>int get(int key)</code> 如果关键字 <code>key</code> 存在于缓存中，则返回关键字的值，否则返回 <code>-1</code> 。</li>\n\t<li><code>void put(int key, int value)</code>&nbsp;如果关键字&nbsp;<code>key</code> 已经存在，则变更其数据值&nbsp;<code>value</code> ；如果不存在，则向缓存中插入该组&nbsp;<code>key-value</code> 。如果插入操作导致关键字数量超过&nbsp;<code>capacity</code> ，则应该 <strong>逐出</strong> 最久未使用的关键字。</li>\n</ul>\n\n<p>函数 <code>get</code> 和 <code>put</code> 必须以 <code>O(1)</code> 的平均时间复杂度运行。</p>\n</div>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>示例：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\n<strong>输出</strong>\n[null, null, null, 1, null, -1, null, -1, 3, 4]\n\n<strong>解释</strong>\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // 缓存是 {1=1}\nlRUCache.put(2, 2); // 缓存是 {1=1, 2=2}\nlRUCache.get(1);    // 返回 1\nlRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}\nlRUCache.get(2);    // 返回 -1 (未找到)\nlRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}\nlRUCache.get(1);    // 返回 -1 (未找到)\nlRUCache.get(3);    // 返回 3\nlRUCache.get(4);    // 返回 4\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= capacity &lt;= 3000</code></li>\n\t<li><code>0 &lt;= key &lt;= 10000</code></li>\n\t<li><code>0 &lt;= value &lt;= 10<sup>5</sup></code></li>\n\t<li>最多调用 <code>2 * 10<sup>5</sup></code> 次 <code>get</code> 和 <code>put</code></li>\n</ul>",
  "code": "struct DLinkedNode {\n    int key, value;\n    DLinkedNode* prev;\n    DLinkedNode* next;\n    DLinkedNode(): key(0), value(0), prev(nullptr), next(nullptr) {}\n    DLinkedNode(int _key, int _value): key(_key), value(_value), prev(nullptr), next(nullptr) {}\n};\n\nclass LRUCache {\nprivate:\n    unordered_map<int, DLinkedNode*> cache;\n    DLinkedNode* head;\n    DLinkedNode* tail;\n    int size;\n    int capacity;\n\npublic:\n    LRUCache(int _capacity): capacity(_capacity), size(0) {\n        // 使用伪头部和伪尾部节点\n        head = new DLinkedNode();\n        tail = new DLinkedNode();\n        head->next = tail;\n        tail->prev = head;\n    }\n    \n    int get(int key) {\n        if (!cache.count(key)) {\n            return -1;\n        }\n        // 如果 key 存在，先通过哈希表定位，再移到头部\n        DLinkedNode* node = cache[key];\n        moveToHead(node);\n        return node->value;\n    }\n    \n    void put(int key, int value) {\n        if (!cache.count(key)) {\n            // 如果 key 不存在，创建一个新的节点\n            DLinkedNode* node = new DLinkedNode(key, value);\n            // 添加进哈希表\n            cache[key] = node;\n            // 添加至双向链表的头部\n            addToHead(node);\n            ++size;\n            if (size > capacity) {\n                // 如果超出容量，删除双向链表的尾部节点\n                DLinkedNode* removed = removeTail();\n                // 删除哈希表中对应的项\n                cache.erase(removed->key);\n                // 防止内存泄漏\n                delete removed;\n                --size;\n            }\n        }\n        else {\n            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部\n            DLinkedNode* node = cache[key];\n            node->value = value;\n            moveToHead(node);\n        }\n    }\n\n    void addToHead(DLinkedNode* node) {\n        node->prev = head;\n        node->next = head->next;\n        head->next->prev = node;\n        head->next = node;\n    }\n    \n    void removeNode(DLinkedNode* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n\n    void moveToHead(DLinkedNode* node) {\n        removeNode(node);\n        addToHead(node);\n    }\n\n    DLinkedNode* removeTail() {\n        DLinkedNode* node = tail->prev;\n        removeNode(node);\n        return node;\n    }\n};",
  "cards": [
   {
    "id": "p146-addtohead-old-next-prev-first",
    "crux": "addToHead 里必须先用旧的 head->next 更新其 prev，再把 head->next 指向新节点，顺序反了会自环",
    "answer": "head->next->prev = node;",
    "blankOffset": 1754,
    "blankLen": 24,
    "options": [
     "head->next->prev = node;",
     "head->next = node;"
    ],
    "why": "此时 head->next 还是旧的第一个节点，必须先让它的 prev 指向新 node，再把 head->next 改成 node；顺序反了 head->next 会先变成 node 本身，导致 head->next->prev = node 实际上变成 node->prev = node，链表出现自环，破坏整个双向链表结构。",
    "wrongWhy": {
     "head->next = node;": "提前把 head->next 改成 node 后，再执行 head->next->prev = node 就等价于 node->prev = node，产生自环，原来的旧头节点也彻底和链表断开（悬空但未删除），后续遍历/删除都会出错。"
    }
   },
   {
    "id": "p146-movetohead-remove-before-add",
    "crux": "moveToHead 必须先把节点从原位置摘下来，再插入头部，顺序反了会导致链表指针错乱",
    "answer": "removeNode(node);",
    "blankOffset": 1992,
    "blankLen": 17,
    "options": [
     "removeNode(node);",
     "addToHead(node);"
    ],
    "why": "节点当前仍处于链表中间（有 prev/next 指向旧邻居），必须先 removeNode 把它从原位置摘掉，恢复旧邻居之间的连接，再 addToHead 插到头部；先后顺序不能换。",
    "wrongWhy": {
     "addToHead(node);": "选 addToHead 就变成连续两次 addToHead、完全没有 removeNode：node 从未从原位置摘除，它的旧 prev/next 邻居仍然指向 node，插到头部后旧邻居和头部同时指向 node 形成多头指向，链表结构错乱，旧邻居之间的连接也永远得不到恢复。"
    }
   },
   {
    "id": "p146-put-overflow-check-strict-greater",
    "crux": "put 中插入新节点后判断是否超出容量要用严格大于 >，不能用 >=，否则刚插入的节点会被立刻淘汰",
    "answer": ">",
    "blankOffset": 1173,
    "blankLen": 1,
    "options": [
     ">",
     ">="
    ],
    "why": "++size 后，size 等于 capacity 表示『刚好装满』，并未超出容量，不需要淘汰；只有 size 严格大于 capacity 才说明插入这一个节点导致真正超员，需要摘掉尾部最久未用的节点。",
    "wrongWhy": {
     ">=": "当 capacity 为例如 1、第一次 put 后 size 变成 1，size >= capacity 成立，会立刻执行 removeTail 把刚插入的这个节点当作尾节点删掉，导致缓存永远存不进任何数据，功能完全失效。"
    }
   }
  ]
 },
 {
  "id": 148,
  "title": "148. 排序链表",
  "category": "链表",
  "difficulty": "medium",
  "descHtml": "<p>给你链表的头结点&nbsp;<code>head</code>&nbsp;，请将其按 <strong>升序</strong> 排列并返回 <strong>排序后的链表</strong> 。</p>\n\n<ul>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<b>输入：</b>head = [4,2,1,3]\n<b>输出：</b>[1,2,3,4]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<b>输入：</b>head = [-1,5,3,4,0]\n<b>输出：</b>[-1,0,3,4,5]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<b>输入：</b>head = []\n<b>输出：</b>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><b>提示：</b></p>\n\n<ul>\n\t<li>链表中节点的数目在范围&nbsp;<code>[0, 5 * 10<sup>4</sup>]</code>&nbsp;内</li>\n\t<li><code>-10<sup>5</sup>&nbsp;&lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b>你可以在&nbsp;<code>O(n&nbsp;log&nbsp;n)</code> 时间复杂度和常数级空间复杂度下，对链表进行排序吗？</p>",
  "code": "class Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        return sortList(head, nullptr);\n    }\n\n    ListNode* sortList(ListNode* head, ListNode* tail) {\n        if (head == nullptr) {\n            return head;\n        }\n        if (head->next == tail) { // 区间 [head, tail) 只剩单个节点：断链后返回\n            head->next = nullptr;\n            return head;\n        }\n        ListNode* slow = head, *fast = head;\n        while (fast != tail) {\n            slow = slow->next;\n            fast = fast->next;\n            if (fast != tail) {\n                fast = fast->next;\n            }\n        }\n        ListNode* mid = slow; // 快慢指针求得中点，劈成 [head, mid) 与 [mid, tail)\n        return merge(sortList(head, mid), sortList(mid, tail));\n    }\n\n    ListNode* merge(ListNode* head1, ListNode* head2) {\n        ListNode* dummyHead = new ListNode(0);\n        ListNode* temp = dummyHead, *temp1 = head1, *temp2 = head2;\n        while (temp1 != nullptr && temp2 != nullptr) {\n            if (temp1->val <= temp2->val) {\n                temp->next = temp1;\n                temp1 = temp1->next;\n            } else {\n                temp->next = temp2;\n                temp2 = temp2->next;\n            }\n            temp = temp->next;\n        }\n        if (temp1 != nullptr) {\n            temp->next = temp1;\n        } else if (temp2 != nullptr) {\n            temp->next = temp2;\n        }\n        return dummyHead->next;\n    }\n};",
  "cards": [
   {
    "id": "p148-single-node-tail-check",
    "crux": "递归终止时判断“区间只剩一个节点”，比较对象必须是 tail 而不是 nullptr 或 head 本身",
    "answer": "head->next == tail",
    "blankOffset": 248,
    "blankLen": 18,
    "options": [
     "head->next == tail",
     "head == tail",
     "head->next == nullptr"
    ],
    "why": "递归按左闭右开区间 [head, tail) 处理，tail 不一定是 nullptr（可能是上层递归切出来的中点）。当 head 的下一个节点正好是 tail 时，说明这个区间里只有 head 一个节点，需要单独处理。",
    "wrongWhy": {
     "head == tail": "这个条件对应的是「区间为空」而不是「只剩单个节点」，用它做单节点判断会漏掉真正只剩一个节点的情况，导致该情况继续走后面的快慢指针逻辑，行为不正确。",
     "head->next == nullptr": "只在 tail 恰好是链表末尾（nullptr）时才等价；但递归切分出的子区间的 tail 往往是链表中间某个节点，此时 head->next 永远不会等于 nullptr（除非真的到链表尾部），导致单节点分支根本不会被触发，快慢指针会越过真正的 tail 继续走下去。"
    }
   },
   {
    "id": "p148-break-link-before-return",
    "crux": "只剩单节点时必须真正把 head->next 置空断链，否则该节点仍连着后面的子链表，合并时会出错甚至死循环",
    "answer": "head->next = nullptr;",
    "blankOffset": 314,
    "blankLen": 21,
    "options": [
     "head->next = nullptr;",
     "head->next = tail;",
     "head = nullptr;"
    ],
    "why": "递归返回的这个单节点会被上层当作一条独立的、只有一个元素的有序链表去 merge；如果不把 next 断开，它还挂着 tail 及其后面的节点，merge 时就会把不属于这个子问题的节点也串进来，破坏区间边界。",
    "wrongWhy": {
     "head->next = tail;": "这等于什么都没做（本来 head->next 就等于 tail），单节点并没有真正和后面的链表断开，merge 的时候会顺着这个 next 继续遍历到 tail 及之后的节点，产生错误的连接甚至重复访问节点导致死循环。",
     "head = nullptr;": "这只是把局部变量 head 置为空指针，并不会修改链表节点本身的 next 指针；紧接着 return head 返回的会是 nullptr，导致这个节点直接从结果中丢失，排序结果少了一个元素。"
    }
   },
   {
    "id": "p148-fast-slow-loop-condition",
    "crux": "快慢指针找中点的循环条件要用 fast != tail，而不是 fast != nullptr（tail 往往不是链表末尾）",
    "answer": "fast != tail",
    "blankOffset": 431,
    "blankLen": 12,
    "options": [
     "fast != tail",
     "fast != nullptr",
     "fast->next != tail"
    ],
    "why": "区间是左闭右开 [head, tail)，tail 是这一层递归的右边界（可能是链表中间某个节点，不是 nullptr），所以快指针必须以 tail 作为终止标志，fast 走到 tail 就停。",
    "wrongWhy": {
     "fast != nullptr": "只有当 tail 恰好是 nullptr（即处理整条链表）时才正确；但递归切分出来的子区间的 tail 通常是链表中间的节点，fast 会越过 tail 继续往后走，直到走到真正的链表末尾才停，slow 也随之多走了很多步，算出来的“中点”远远偏离了当前区间的中点，切分完全错误。",
     "fast->next != tail": "这个条件多往前看了一个节点。当 fast 前进到 tail 时循环本该停止，但它要先计算 fast->next：顶层调用里 tail 就是 nullptr，fast 变成 nullptr 后再取 fast->next 就是对空指针解引用，直接崩溃；即便不崩溃，提前一步结束也会让 slow 停在真正中点之前，切出的 mid 位置错误。"
    }
   },
   {
    "id": "p148-merge-compare-operator",
    "crux": "合并两条有序链时要比较节点值、把较小者接到结果；比较方向写反（用 >=）会优先接上较大者，整条结果变成降序",
    "answer": "temp1->val <= temp2->val",
    "blankOffset": 984,
    "blankLen": 24,
    "options": [
     "temp1->val <= temp2->val",
     "temp1->val >= temp2->val"
    ],
    "why": "merge 逐个比较两条链表当前的表头节点，接上值较小的那个并推进对应指针。因为两个子链本身已升序，每次取两个表头里较小的，就能让合并结果整体保持升序。",
    "wrongWhy": {
     "temp1->val >= temp2->val": "比较方向反了，改成优先接上值较大的表头；由于整个归并递归都用这个反向比较，每一层切出的子链都会被排成降序，逐层向上合并后最终结果是整条降序链，而不是题目要求的升序，排序结果错误。"
    }
   },
   {
    "id": "p148-merge-loop-and-condition",
    "crux": "合并主循环要用 && 保证两条链表都还有剩余节点才继续，用 || 会在一条已经走完时对空指针继续解引用",
    "answer": "temp1 != nullptr && temp2 != nullptr",
    "blankOffset": 928,
    "blankLen": 36,
    "options": [
     "temp1 != nullptr && temp2 != nullptr",
     "temp1 != nullptr || temp2 != nullptr"
    ],
    "why": "循环体内部直接访问 temp1->val 和 temp2->val，必须保证两条链表都还有节点才能进入循环体；一旦有一条走完就要跳出循环，交给后面的剩余段处理逻辑去挂接。",
    "wrongWhy": {
     "temp1 != nullptr || temp2 != nullptr": "只要有一条链表还有剩余就会继续循环，当另一条已经变成 nullptr 后，循环体里的 temp1->val 或 temp2->val 会对空指针解引用，直接导致程序崩溃。"
    }
   }
  ]
 },
 {
  "id": 152,
  "title": "152. 乘积最大子数组",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code>&nbsp;，请你找出数组中乘积最大的非空连续 <span data-keyword=\"subarray-nonempty\">子数组</span>（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。</p>\n\n<p>测试用例的答案是一个&nbsp;<strong>32-位</strong> 整数。</p>\n\n<p><strong>请注意</strong>，一个只包含一个元素的数组的乘积是这个元素的值。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [2,3,-2,4]\n<strong>输出:</strong> <code>6</code>\n<strong>解释:</strong>&nbsp;子数组 [2,3] 有最大乘积 6。\n</pre>\n\n<p><strong class=\"example\">示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [-2,0,-1]\n<strong>输出:</strong> 0\n<strong>解释:</strong>&nbsp;结果不能为 2, 因为 [-2,-1] 不是子数组。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>\n\t<li><code>nums</code> 的任何子数组的乘积都 <strong>保证</strong>&nbsp;是一个 <strong>32-位</strong> 整数</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        long maxF = nums[0], minF = nums[0], ans = nums[0];\n        for (int i = 1; i < nums.size(); ++i) {\n            long mx = maxF, mn = minF;\n            maxF = max(mx * nums[i], max((long)nums[i], mn * nums[i])); // 负负得正：最大值可能来自最小值乘负数\n            minF = min(mn * nums[i], min((long)nums[i], mx * nums[i]));\n            if(minF<INT_MIN) {\n                minF=nums[i];\n            }\n            ans = max(maxF, ans);\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p152-init-maxf-with-nums0",
    "crux": "maxF/minF/ans 必须用 nums[0] 初始化，不能用 0 或 INT_MIN",
    "answer": "nums[0]",
    "blankOffset": 85,
    "blankLen": 7,
    "options": [
     "nums[0]",
     "0",
     "INT_MIN"
    ],
    "why": "循环是从 i=1 开始遍历的（数组下标 0 已经被当作起点纳入状态），所以 maxF/minF/ans 必须先用 nums[0] 作为‘以第 0 个元素结尾’的最大/最小乘积和当前答案，这样后续从 i=1 起才能正确递推；这是本题维护 maxF/minF 两个状态并逐位转移的起点设定。",
    "wrongWhy": {
     "0": "若数组全为负数（如 [-2,-3,-4]），真正答案应是某个负数或偶数个负数的乘积，但把 maxF 初始化成 0 会让 0 一直参与比较、把答案错误地‘架空’成 0，因为 0 从未被真实包含在候选乘积里却被当成了上界。",
     "INT_MIN": "循环从 i=1 开始，nums[0] 本身也是一个合法的候选答案（例如数组只有一个元素，或 nums[0] 就是全局最大值），若不用 nums[0] 初始化而用 INT_MIN，会丢失‘单独 nums[0] 作为答案’这一候选，导致结果偏小或对单元素数组直接出错。"
    }
   },
   {
    "id": "p152-loop-start-from-i-1",
    "crux": "循环必须从 i = 1 开始，而不是 i = 0",
    "answer": "1",
    "blankOffset": 146,
    "blankLen": 1,
    "options": [
     "1",
     "0"
    ],
    "why": "maxF、minF、ans 在循环前已经用 nums[0] 初始化，代表‘以下标 0 结尾’的状态；循环体内部是基于 nums[i] 对 mx/mn（即上一步的 maxF/minF）做转移，所以必须从 i=1 才是处理第二个元素，避免重复处理 nums[0]。",
    "wrongWhy": {
     "0": "若从 i=0 开始，此时 mx=maxF=nums[0]、mn=minF=nums[0]，会用 nums[0] 自己去乘以 nums[0]（即 nums[0]*nums[0]），把状态污染成一个不存在的‘平方项’，对含负数的用例（如 [-2,3,-4]）会直接得到错误的初始状态并连锁影响后续所有递推结果。"
    }
   },
   {
    "id": "p152-maxf-must-include-min-times-negative",
    "crux": "maxF 的转移必须包含 mn * nums[i] 这一支（负负得正）",
    "answer": "mn * nums[i]",
    "blankOffset": 268,
    "blankLen": 12,
    "options": [
     "mn * nums[i]",
     "mx * nums[i]",
     "nums[i]"
    ],
    "why": "乘积会因为负数发生正负翻转：如果 nums[i] 是负数，那么此前维护的最小值 minF（可能是绝对值很大的负数）乘上这个负数反而会变成很大的正数，所以求 maxF 时必须把 mn * nums[i] 也纳入候选，这正是本题区别于普通‘最大子数组和’的关键。",
    "wrongWhy": {
     "mx * nums[i]": "把候选写成重复的 mx * nums[i]，等于完全丢弃了‘负负得正’这一支，遇到 [-2,3,-4] 这类用例时，真正的最大乘积（来自很小的 minF 乘以负数 nums[i]）永远算不出来，maxF 会比正确答案偏小。",
     "nums[i]": "只写 nums[i] 与前面已有的 (long)nums[i] 项重复，同样没有考虑 minF 与当前负数相乘的情况，逻辑上等价于漏掉了整个负负得正分支。"
    }
   },
   {
    "id": "p152-minf-use-snapshot-mx-not-updated-maxf",
    "crux": "计算 minF 时要用循环开头保存的旧值 mx，而不是已经被更新过的 maxF",
    "answer": "mx",
    "blankOffset": 362,
    "blankLen": 2,
    "options": [
     "mx",
     "maxF"
    ],
    "why": "题解在每轮循环开头先用 long mx = maxF, mn = minF; 把上一轮的 maxF/minF 快照下来，然后先更新 maxF、再更新 minF；由于 minF 的转移同样需要‘更新前’的最大值参与负负得正的判断，必须使用快照变量 mx，而不能用上一行刚刚被重新赋值的 maxF，否则计算 minF 时用到的就是本轮新的 maxF 而不是上一轮的状态。",
    "wrongWhy": {
     "maxF": "此时 maxF 已经在上一行被更新为本轮新值，若在 minF 转移里误用 maxF 代替 mx，相当于让 minF 用‘未来’的状态参与计算。以 nums=[-5,-4] 为例，正确 minF 应为 -4（用旧值 mx=-5），但误用新 maxF=20 会算出 20*-4=-80 这个重复使用 nums[1]、根本不存在的乘积，把 minF 污染成 -80，并进一步影响后续所有轮次的结果。"
    }
   }
  ]
 },
 {
  "id": 153,
  "title": "153. 寻找旋转排序数组中的最小值",
  "category": "二分查找",
  "difficulty": "medium",
  "descHtml": "已知一个长度为 <code>n</code> 的数组，预先按照升序排列，经由 <code>1</code> 到 <code>n</code> 次 <strong>旋转</strong> 后，得到输入数组。例如，原数组 <code>nums = [0,1,2,4,5,6,7]</code> 在变化后可能得到：\n<ul>\n\t<li>若旋转 <code>4</code> 次，则可以得到 <code>[4,5,6,7,0,1,2]</code></li>\n\t<li>若旋转 <code>7</code> 次，则可以得到 <code>[0,1,2,4,5,6,7]</code></li>\n</ul>\n\n<p>注意，数组 <code>[a[0], a[1], a[2], ..., a[n-1]]</code> <strong>旋转一次</strong> 的结果为数组 <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code> 。</p>\n\n<p>给你一个元素值 <strong>互不相同</strong> 的数组 <code>nums</code> ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 <strong>最小元素</strong> 。</p>\n\n<p>你必须设计一个时间复杂度为&nbsp;<code>O(log n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,4,5,1,2]\n<strong>输出：</strong>1\n<strong>解释：</strong>原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [4,5,6,7,0,1,2]\n<strong>输出：</strong>0\n<strong>解释：</strong>原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [11,13,15,17]\n<strong>输出：</strong>11\n<strong>解释：</strong>原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5000</code></li>\n\t<li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li>\n\t<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>\n\t<li><code>nums</code> 原来是一个升序排序的数组，并进行了 <code>1</code> 至 <code>n</code> 次旋转</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int low = 0;\n        int high = nums.size() - 1;\n        while (low < high) {\n            int pivot = low + (high - low) / 2;\n            if (nums[pivot] < nums[high]) {\n                high = pivot; // pivot 可能就是最小值，不能减一\n            }\n            else {\n                low = pivot + 1; // nums[pivot] >= nums[high]，最小值一定在 pivot 右侧\n            }\n        }\n        return nums[low];\n    }\n};",
  "cards": [
   {
    "id": "p153-loop-condition-low-lt-high",
    "crux": "循环条件必须是 low < high，不能写成 low <= high",
    "answer": "low < high",
    "blankOffset": 134,
    "blankLen": 10,
    "options": [
     "low < high",
     "low <= high",
     "low < high - 1"
    ],
    "why": "退出循环时 low 恰好收敛到最小值下标；由于收缩规则里 high = pivot（不减一）不会跳过 low，当 low == high 时区间只剩一个元素即答案，此时应立即停止取 nums[low]，因此用 low < high。",
    "wrongWhy": {
     "low <= high": "low == high 时区间已收敛到单个元素，再次进入循环计算 pivot=low=high，比较 nums[pivot] 与 nums[high] 恒相等会走 else 分支执行 low = pivot + 1，导致 low 越界（low 变为 high+1），返回 nums[low] 时数组越界。",
     "low < high - 1": "会提前一步退出循环，此时区间还剩两个元素未比较完，返回的 nums[low] 不一定是全局最小值。"
    }
   },
   {
    "id": "p153-compare-with-nums-high",
    "crux": "比较基准必须是右端点 nums[high]，不能改用左端点或固定 nums[0]",
    "answer": "nums[pivot] < nums[high]",
    "blankOffset": 212,
    "blankLen": 24,
    "options": [
     "nums[pivot] < nums[high]",
     "nums[pivot] < nums[low]",
     "nums[pivot] < nums[0]"
    ],
    "why": "与右端点比较能唯一区分“[low, pivot] 整体有序”和“最小值落在 [low, pivot]”两种情况；与左端点比较时，当子区间恰好整体递增（未被旋转切断）会产生歧义，无法确定最小值在左半还是右半。",
    "wrongWhy": {
     "nums[pivot] < nums[low]": "当 [low, high] 这段子数组本身不含旋转点（单调递增）时 nums[pivot] 一定大于等于 nums[low]，会误判走向 else 分支，导致收缩方向错误、漏掉左侧真正的最小值。",
     "nums[pivot] < nums[0]": "nums[0] 是整个数组的起点而非当前搜索区间的右端点，随着 low、high 收缩后 nums[0] 与当前子区间的关系已经失效，比较结果不能反映 pivot 在当前区间内的位置关系。"
    }
   },
   {
    "id": "p153-high-equals-pivot-not-minus-one",
    "crux": "找到左半可能含最小值时，high 只能等于 pivot，不能再减一",
    "answer": "high = pivot;",
    "blankOffset": 256,
    "blankLen": 13,
    "options": [
     "high = pivot;",
     "high = pivot - 1;",
     "high = pivot + 1;"
    ],
    "why": "当 nums[pivot] < nums[high] 时，pivot 本身就有可能是最小值（整个左半区间仍可能在收缩后归零到 pivot），若减一会把这个候选答案排除在搜索区间之外，造成最终得到错误结果。",
    "wrongWhy": {
     "high = pivot - 1;": "会把 pivot 排除出搜索区间；一旦 pivot 恰好就是最小值下标，最终返回的 nums[low] 会跳过它，得到错误的（偏大的）结果。",
     "high = pivot + 1;": "由于 pivot 恒小于 high，pivot+1 至多等于 high，根本不会把右边界压向 pivot；当 pivot+1 == high 时 high 不变、区间无法收缩会导致死循环，无法收敛到最小值。"
    }
   },
   {
    "id": "p153-low-equals-pivot-plus-one",
    "crux": "确定最小值在右半时，low 必须跳过 pivot 写成 pivot + 1，而不是 pivot",
    "answer": "low = pivot + 1;",
    "blankOffset": 341,
    "blankLen": 16,
    "options": [
     "low = pivot + 1;",
     "low = pivot;",
     "low = pivot - 1;"
    ],
    "why": "此时 nums[pivot] >= nums[high] 说明 pivot 一定不是最小值（它比右端点还大或相等，右侧必然存在更小的旋转断点），可以安全排除 pivot，故 low = pivot + 1；否则区间无法收缩会导致死循环。",
    "wrongWhy": {
     "low = pivot;": "pivot 已被证明不可能是最小值，但仍留在搜索区间内，且当 low == pivot 时区间不再缩小（low 保持不变），导致死循环。",
     "low = pivot - 1;": "会把 low 移到 pivot 左侧，丢弃了已经可以确定不含最小值的 pivot 左边区域信息，还可能使 low 越过 high 或跳过真正的最小值所在位置。"
    }
   }
  ]
 },
 {
  "id": 155,
  "title": "155. 最小栈",
  "category": "栈",
  "difficulty": "medium",
  "descHtml": "<p>设计一个支持 <code>push</code> ，<code>pop</code> ，<code>top</code> 操作，并能在常数时间内检索到最小元素的栈。</p>\n\n<p>实现 <code>MinStack</code> 类:</p>\n\n<ul>\n\t<li><code>MinStack()</code> 初始化堆栈对象。</li>\n\t<li><code>void push(int value)</code> 将元素 <code>value</code> 推入堆栈。</li>\n\t<li><code>void pop()</code> 删除堆栈顶部的元素。</li>\n\t<li><code>int top()</code> 获取堆栈顶部的元素。</li>\n\t<li><code>int getMin()</code> 获取堆栈中的最小元素。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入：</strong>\n[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]\n\n<strong>输出：</strong>\n[null,null,null,null,-3,null,0,-2]\n\n<strong>解释：</strong>\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin();   --&gt; 返回 -3.\nminStack.pop();\nminStack.top();      --&gt; 返回 0.\nminStack.getMin();   --&gt; 返回 -2.\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= val &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n\t<li><code>pop</code>、<code>top</code> 和 <code>getMin</code> 操作总是在 <strong>非空栈</strong> 上调用</li>\n\t<li><code>push</code>,&nbsp;<code>pop</code>,&nbsp;<code>top</code>, and&nbsp;<code>getMin</code>最多被调用&nbsp;<code>3 * 10<sup>4</sup></code>&nbsp;次</li>\n</ul>",
  "code": "class MinStack {\n    stack<int> x_stack;\n    stack<int> min_stack;\npublic:\n    MinStack() {\n        min_stack.push(INT_MAX); // 哨兵，首次 push 时不用判空\n    }\n\n    void push(int x) {\n        x_stack.push(x);\n        min_stack.push(min(min_stack.top(), x)); // 不变量：辅助栈顶 == 当前栈内最小值\n    }\n\n    void pop() {\n        x_stack.pop();\n        min_stack.pop();\n    }\n\n    int top() {\n        return x_stack.top();\n    }\n\n    int getMin() {\n        return min_stack.top();\n    }\n};",
  "cards": [
   {
    "id": "p155-minstack-sentinel-init-int-max",
    "crux": "构造函数里辅助栈必须先压 INT_MAX 作哨兵，否则首次 push 时 min_stack 为空，top() 访问越界",
    "answer": "INT_MAX",
    "blankOffset": 115,
    "blankLen": 7,
    "options": [
     "INT_MAX",
     "INT_MIN",
     "0",
     "x_stack.top()"
    ],
    "why": "solutionText 明确指出「构造时先压 INT_MAX 作哨兵，否则首次 push 取 top() 访问空栈」。压 INT_MAX 保证第一次 push(x) 时 min(min_stack.top(), x) 一定取到 x 本身，不影响真实最小值的计算。",
    "wrongWhy": {
     "0": "哨兵设为 0 时，只要栈内元素都大于 0，min(0, x) 就恒为 0，getMin() 会返回 0 而非真实的最小正数；只有恰好存在 ≤0 的元素才碰巧不出错，因此不能作哨兵。",
     "INT_MIN": "哨兵设为 INT_MIN 后，min(min_stack.top(), x) 永远等于 INT_MIN（因为 INT_MIN 比任何数都小），getMin() 会一直返回 INT_MIN，完全失效。",
     "x_stack.top()": "构造函数执行时 x_stack 也是空的，对空栈调用 top() 是未定义行为，会崩溃或越界。"
    }
   },
   {
    "id": "p155-minstack-push-min-invariant",
    "crux": "push 时辅助栈必须压入 min(min_stack.top(), x)，以维持「辅助栈顶 == 当前最小值」的不变量",
    "answer": "min(min_stack.top(), x)",
    "blankOffset": 223,
    "blankLen": 23,
    "options": [
     "min(min_stack.top(), x)",
     "x",
     "max(min_stack.top(), x)",
     "min(x_stack.top(), x)"
    ],
    "why": "hints 中说明「push(x) 时辅助栈压入 min(min_stack.top(), x)」，这样每次 push 后辅助栈顶都是「压入 x 之前的最小值」与「x」两者中较小的一个，从而始终保持辅助栈顶等于当前数据栈的全局最小值，使 getMin() 能 O(1) 直接返回栈顶。",
    "wrongWhy": {
     "x": "直接压入 x 会破坏不变量，辅助栈顶只反映最近一次 push 的值而非全局最小值，之后 getMin() 会返回错误结果（比如先压小数再压大数，getMin 会误返回大数）。",
     "max(min_stack.top(), x)": "用 max 会让辅助栈顶越变越大，getMin() 返回的是当前栈内的最大值而不是最小值，逻辑完全颠倒。",
     "min(x_stack.top(), x)": "此时 x_stack 已经 push 过 x，所以 x_stack.top() 恰好等于 x，min(x, x) 恒等于 x，等价于直接压入 x，同样破坏了「辅助栈顶记录全局最小值」的不变量。"
    }
   }
  ]
 },
 {
  "id": 160,
  "title": "160. 相交链表",
  "category": "链表",
  "difficulty": "easy",
  "descHtml": "<p>给你两个单链表的头节点&nbsp;<code>headA</code> 和 <code>headB</code> ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 <code>null</code> 。</p>\n\n<p>图示两个链表在节点 <code>c1</code> 开始相交<strong>：</strong></p>\n\n<p><a href=\"https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png\" target=\"_blank\"></a></p>\n\n<p>题目数据 <strong>保证</strong> 整个链式结构中不存在环。</p>\n\n<p><strong>注意</strong>，函数返回结果后，链表必须 <strong>保持其原始结构</strong> 。</p>\n\n<p><strong>自定义评测：</strong></p>\n\n<p><strong>评测系统</strong> 的输入如下（你设计的程序 <strong>不适用</strong> 此输入）：</p>\n\n<ul>\n\t<li><code>intersectVal</code> - 相交的起始节点的值。如果不存在相交节点，这一值为 <code>0</code></li>\n\t<li><code>listA</code> - 第一个链表</li>\n\t<li><code>listB</code> - 第二个链表</li>\n\t<li><code>skipA</code> - 在 <code>listA</code> 中（从头节点开始）跳到交叉节点的节点数</li>\n\t<li><code>skipB</code> - 在 <code>listB</code> 中（从头节点开始）跳到交叉节点的节点数</li>\n</ul>\n\n<p>评测系统将根据这些输入创建链式数据结构，并将两个头节点 <code>headA</code> 和 <code>headB</code> 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 <strong>视作正确答案</strong> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_1.png\" target=\"_blank\"></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3\n<strong>输出：</strong>Intersected at '8'\n<strong>解释：</strong>相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。\n从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。\n在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。\n— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中<font size=\"1\">第三个</font>节点，B 中第四个节点) 在内存中指向相同的位置。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_2.png\" target=\"_blank\"></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal&nbsp;= 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1\n<strong>输出：</strong>Intersected at '2'\n<strong>解释：</strong>相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。\n从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。\n在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。\n</pre>\n\n<p><strong>示例&nbsp;3：</strong></p>\n\n<p><a href=\"https://assets.leetcode.com/uploads/2018/12/13/160_example_3.png\" target=\"_blank\"></a></p>\n\n<pre>\n<strong>输入：</strong>intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2\n<strong>输出：</strong>No intersection\n<strong>解释：</strong>从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。\n由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。\n这两个链表不相交，因此返回 null 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>listA</code> 中节点数目为 <code>m</code></li>\n\t<li><code>listB</code> 中节点数目为 <code>n</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>\n\t<li><code>0 &lt;= skipA &lt;= m</code></li>\n\t<li><code>0 &lt;= skipB &lt;= n</code></li>\n\t<li>如果 <code>listA</code> 和 <code>listB</code> 没有交点，<code>intersectVal</code> 为 <code>0</code></li>\n\t<li>如果 <code>listA</code> 和 <code>listB</code> 有交点，<code>intersectVal == listA[skipA] == listB[skipB]</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能否设计一个时间复杂度 <code>O(m + n)</code> 、仅用 <code>O(1)</code> 内存的解决方案？</p>",
  "code": "class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        if (headA == nullptr || headB == nullptr) {\n            return nullptr;\n        }\n        ListNode *pA = headA, *pB = headB;\n        while (pA != pB) {\n            pA = pA == nullptr ? headB : pA->next; // 走完 A 接着走 B：两指针总路程同为 a+b，抹平长度差\n            pB = pB == nullptr ? headA : pB->next;\n        }\n        return pA;\n    }\n};",
  "cards": [
   {
    "id": "p160-loop-condition-pointer-equality",
    "crux": "循环终止条件必须是「两个指针本身是否相等」(pA != pB)，不能改成分别判空，否则会在尚未相遇前就提前退出",
    "answer": "pA != pB",
    "blankOffset": 243,
    "blankLen": 8,
    "options": [
     "pA != pB",
     "pA != nullptr && pB != nullptr",
     "pA == pB",
     "pA != pB && pA != nullptr"
    ],
    "why": "算法靠“同速走 a+b 步后必然相遇”这一不变量收敛：不管相交与否，pA、pB 最终都会指向同一个值（交点或 nullptr）。因此唯一正确的退出条件就是判断两个指针本身是否已经相等，不能借助是否为空来提前判断。",
    "wrongWhy": {
     "pA != nullptr && pB != nullptr": "把两指针分别判空后，只要任一指针先走到 nullptr（两链长度不同时必然一先一后到达，而非同时），循环就在它们真正相等之前提前退出，返回错误结果；正确写法必须等到 pA、pB 指向同一个值（交点，或同时为 nullptr）才停下",
     "pA == pB": "条件方向反了：初始时 pA=headA、pB=headB 通常并不相等，while 判断为假，循环体一次都不会执行，直接返回未经任何移动的 pA（即 headA），完全没有做双指针抹平长度差的过程",
     "pA != pB && pA != nullptr": "多加的 pA != nullptr 会在 pA 恰好走到 nullptr（还未与 pB 相遇）时把整个条件短路为 false，循环提前结束，返回 nullptr，即使两链其实相交也会被误判为不相交"
    }
   },
   {
    "id": "p160-switch-target-pA-must-be-other-head",
    "crux": "pA 走到 nullptr 后必须切到「另一条链」headB 的头，而不是自己的 headA，否则两指针永远不会同步相遇",
    "answer": "headB",
    "blankOffset": 288,
    "blankLen": 5,
    "options": [
     "headB",
     "headA",
     "pB",
     "headB->next"
    ],
    "why": "这道题的核心技巧就是让 pA 依次走「A 的剩余部分 + B 的全部」、让 pB 走「B 的剩余部分 + A 的全部」，两者总路程都变成 a+b，从而在第二段路上于交点对齐。切换目标必须是对方链表的头节点 headB，这样才能抹平两条链的长度差。",
    "wrongWhy": {
     "headA": "切回自己的头会让 pA 反复原地绕圈（headA→…→nullptr→headA→…），路程始终只是 A 链长度的倍数，永远凑不出 a+b，导致两指针除非两链完全相同否则永不相遇，出现死循环",
     "pB": "切到当前的 pB 而不是固定的 headB：pB 本身也在同步变化，这样 pA 会走一条随时间漂移、不确定的路径，破坏“总路程恰为 a+b”这一关键不变量，结果不可预测",
     "headB->next": "跳过了 headB 本身这一个节点，使 pA 少走一步，两指针总路程相差 1，若两链长度差恰好也是这个偏移量时会导致本应相遇的两指针始终错开一位，永远无法在真实交点相遇"
    }
   },
   {
    "id": "p160-switch-target-pB-must-be-other-head",
    "crux": "pB 走到 nullptr 后必须切到「另一条链」headA 的头，与 pA 的切换方向对称，缺一不可",
    "answer": "headA",
    "blankOffset": 372,
    "blankLen": 5,
    "options": [
     "headA",
     "headB",
     "pA",
     "nullptr"
    ],
    "why": "对称地，pB 要走「B 的剩余部分 + A 的全部」才能使其总路程也是 a+b，与 pA 的路径互补，两者才会在交点处第一次真正相等；这一行必须切到 headA。",
    "wrongWhy": {
     "headB": "切回自己的头会让 pB 只在 B 链内部循环，路程始终是 B 链长度的倍数，凑不出 a+b，除非两链长度恰好相等，否则两指针永远不会相遇，造成死循环",
     "pA": "切到当前变化中的 pA 而不是固定的 headA，会让 pB 的路径依赖 pA 实时位置，破坏两条路径各自总长为 a+b 的设计，结果变得不可控",
     "nullptr": "切到 nullptr 后 pB 会永远停在 nullptr（因为条件 pB==nullptr 恒真，每次都再赋值 nullptr），彻底走不到 A 链，只要两链不同时耗尽长度就无法与 pA 相遇，多数情况下会导致死循环或返回错误结果"
    }
   }
  ]
 },
 {
  "id": 169,
  "title": "169. 多数元素",
  "category": "技巧",
  "difficulty": "easy",
  "descHtml": "<p>给定一个大小为 <code>n</code><em> </em>的数组&nbsp;<code>nums</code> ，返回其中的多数元素。多数元素是指在数组中出现次数 <strong>大于</strong>&nbsp;<code>⌊ n/2 ⌋</code>&nbsp;的元素。</p>\n\n<p>你可以假设数组是非空的，并且给定的数组总是存在多数元素。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,2,3]\n<strong>输出：</strong>3</pre>\n\n<p><strong>示例&nbsp;2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [2,2,1,1,1,2,2]\n<strong>输出：</strong>2\n</pre>\n\n<p>&nbsp;</p>\n<strong>提示：</strong>\n\n<ul>\n\t<li><code>n == nums.length</code></li>\n\t<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li>输入保证数组中一定有一个多数元素。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。</p>",
  "code": "class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        int candidate = -1; // 当前候选人\n        int count = 0;      // 候选人的净票数\n        for (int num : nums) {\n            if (num == candidate)\n                ++count;\n            else if (--count < 0) { // 票数被抵消耗尽，换当前元素当候选人\n                candidate = num;\n                count = 1;\n            }\n        }\n        return candidate;\n    }\n};",
  "cards": [
   {
    "id": "p169-vote-decrement-then-compare",
    "crux": "先自减再比较是否小于 0(判断票数是否真正耗尽为负),而非先比较原值或用 <=0/不减法",
    "answer": "--count < 0",
    "blankOffset": 257,
    "blankLen": 11,
    "options": [
     "--count < 0",
     "count-- < 0",
     "--count <= 0",
     "count < 0"
    ],
    "why": "Boyer-Moore 投票要求先扣掉当前不同元素这一票，再看净票数是否已经耗尽变负；用前置自减 --count 保证判断的是扣票之后的值，再用 < 0（而不是 <=0）保证只有真正打平后又欠一票才换人，这样候选人恰好在票数归零打平的那一轮还能撑住，多一票才崩，符合“抵消到底”的语义。",
    "wrongWhy": {
     "count-- < 0": "后置自减先用旧值参与比较、再执行递减，会用“扣票前”的票数去判断是否耗尽，导致判断时机整体错开一步，count 已经变负但条件仍按旧值判断，换人时机与实际耗尽状态不一致。",
     "--count <= 0": "把“打平(0票)”也当成耗尽提前换人，候选人票数刚好抵消到 0（还没有真正为负）就被换掉，会让本该继续存活的候选人过早出局，破坏“多数元素抵不完”的正确性。",
     "count < 0": "只比较不递减，count 只增不减、永远不会小于 0，换人分支永远不会触发，candidate 一直停在初始值 -1，扫完直接返回错误结果，算法整体失效。"
    }
   },
   {
    "id": "p169-vote-reset-count-to-one",
    "crux": "换新候选人时 count 必须重置为 1(代表当前元素自己投给自己的这一票)，不是 0 或负数",
    "answer": "1",
    "blankOffset": 350,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "-1"
    ],
    "why": "新候选人上任时，当前这个 num 本身就是它的第一票，所以净票数应重置为 1；这样下一轮如果遇到相同元素才继续累加，遇到不同元素才需要先扣掉这初始的一票再判断是否耗尽，保证新候选人至少能撑过一轮才可能被换掉。",
    "wrongWhy": {
     "0": "新候选人还没来得及计入自己这一票，下一个不同元素一到就会 --count 变成 -1 满足 <0，立刻把刚换上的候选人又换掉，算法退化成每次都在无意义地换人，无法正确抵消票数。",
     "-1": "把净票数基线整体下移一级，相当于新候选人一上任就已经欠一票，后续无论加票还是减票都会比正确逻辑提前一步触发换人判断，导致最终存活的候选人不再对应真实票数最多的元素。"
    }
   }
  ]
 },
 {
  "id": 189,
  "title": "189. 轮转数组",
  "category": "普通数组",
  "difficulty": "medium",
  "descHtml": "<p>给定一个整数数组 <code>nums</code>，将数组中的元素向右轮转 <code>k</code><em>&nbsp;</em>个位置，其中&nbsp;<code>k</code><em>&nbsp;</em>是非负数。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [1,2,3,4,5,6,7], k = 3\n<strong>输出:</strong> <code>[5,6,7,1,2,3,4]</code>\n<strong>解释:</strong>\n向右轮转 1 步: <code>[7,1,2,3,4,5,6]</code>\n向右轮转 2 步: <code>[6,7,1,2,3,4,5]\n</code>向右轮转 3 步: <code>[5,6,7,1,2,3,4]</code>\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [-1,-100,3,99], k = 2\n<strong>输出：</strong>[3,99,-1,-100]\n<strong>解释:</strong> \n向右轮转 1 步: [99,-1,-100,3]\n向右轮转 2 步: [3,99,-1,-100]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong></p>\n\n<ul>\n\t<li>尽可能想出更多的解决方案，至少有 <strong>三种</strong> 不同的方法可以解决这个问题。</li>\n\t<li>你可以使用空间复杂度为&nbsp;<code>O(1)</code> 的&nbsp;<strong>原地&nbsp;</strong>算法解决这个问题吗？</li>\n</ul>",
  "code": "class Solution {\npublic:\n    void reverse(vector<int>& nums, int start, int end) {\n        while (start < end) {\n            swap(nums[start], nums[end]);\n            start += 1;\n            end -= 1;\n        }\n    }\n\n    void rotate(vector<int>& nums, int k) {\n        k %= nums.size(); // k 可能大于 n，先取模\n        reverse(nums, 0, nums.size() - 1); // 整体翻转后，再把前 k 个与后 n-k 个各自翻回\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.size() - 1);\n    }\n};",
  "cards": [
   {
    "id": "p189-k-mod-before-reverse",
    "crux": "k 必须先对 nums.size() 取模，否则 k 越界会导致后续翻转下标越界",
    "answer": "k %= nums.size(); // k 可能大于 n，先取模",
    "blankOffset": 270,
    "blankLen": 33,
    "options": [
     "k %= nums.size(); // k 可能大于 n，先取模",
     "k = nums.size() % k;",
     "// 不取模，直接使用原始 k"
    ],
    "why": "solutionText 明确指出「易错点：k 可能大于 n，必须先 k %= n」；轮转 k 次和轮转 k%n 次效果完全一样，且只有先取模才能保证后面 reverse(nums,0,k-1) 与 reverse(nums,k,...) 的下标不越界。",
    "wrongWhy": {
     "k = nums.size() % k;": "把取模的两个操作数写反，算的是 size % k 而不是 k % size，语义完全错误，且当 k 为 0 时会触发除零错误。",
     "// 不取模，直接使用原始 k": "当 k >= n 时，k-1 和 k 都可能超出数组下标范围，reverse 内部访问 nums[start]/nums[end] 会越界。"
    }
   },
   {
    "id": "p189-reverse-while-condition",
    "crux": "双指针翻转的循环条件必须是 start < end，不能写成 != 或方向反了的 >",
    "answer": "start < end",
    "blankOffset": 98,
    "blankLen": 11,
    "options": [
     "start < end",
     "start != end",
     "start > end"
    ],
    "why": "翻转用双指针从两端向中间靠拢，start 每次 +1、end 每次 -1，只有 start < end 才需要继续交换；当区间为偶数长度时 start 会直接跨过 end（不会相等），所以只能用严格小于来判断收尾。",
    "wrongWhy": {
     "start != end": "当 [start, end] 区间长度为偶数时，start 递增、end 递减不会恰好相等而是彼此错过（start 变得大于 end），条件 start != end 永远成立，导致死循环并越界访问 nums。",
     "start > end": "把条件方向写反，初始时 start < end 本就不满足 start > end，循环体一次都不会执行，翻转完全没有发生。"
    }
   },
   {
    "id": "p189-first-segment-end-k-minus-1",
    "crux": "翻转前段时终点下标是 k - 1，不能写成 k 或 k + 1",
    "answer": "k - 1",
    "blankOffset": 401,
    "blankLen": 5,
    "options": [
     "k - 1",
     "k",
     "k + 1"
    ],
    "why": "前 k 个元素的合法下标是 0..k-1，所以第二次翻转的终点必须是 k-1，这样才和第三次翻转 reverse(nums, k, size-1) 的起点 k 严丝合缝地分开两段，不重叠也不遗漏。",
    "wrongWhy": {
     "k": "把本属于后半段的第一个元素（下标 k）也纳入前段一起翻转，前后两段分界错位，最终轮转结果多错一位。",
     "k + 1": "多包含了下标 k 和 k+1，当 k 等于 size-1 时 k+1 越界访问，且即便不越界，分界也整体右移导致结果错误。"
    }
   },
   {
    "id": "p189-second-segment-start-k",
    "crux": "翻转后段时起点下标是 k，不能写成 k + 1 或 k - 1",
    "answer": "k",
    "blankOffset": 431,
    "blankLen": 1,
    "options": [
     "k",
     "k + 1",
     "k - 1"
    ],
    "why": "后 n-k 个元素的合法下标是 k..n-1，起点必须是 k，才能与前一次翻转 reverse(nums,0,k-1) 的终点 k-1 恰好衔接，不留缝隙也不重叠。",
    "wrongWhy": {
     "k + 1": "漏掉了下标 k 这个元素，它在整体翻转之后的错误顺序没有被第二次翻转复原，最终该位置的值是错的。",
     "k - 1": "与前一步 reverse(nums, 0, k-1) 的区间重叠，下标 k-1 被翻转两次，相当于又被翻回了错误顺序。"
    }
   },
   {
    "id": "p189-reverse-order-whole-first",
    "crux": "第一次翻转必须是整体翻转 reverse(0, n-1)，而不是某个局部翻转",
    "answer": "reverse(nums, 0, nums.size() - 1); // 整体翻转后，再把前 k 个与后 n-k 个各自翻回",
    "blankOffset": 312,
    "blankLen": 63,
    "options": [
     "reverse(nums, 0, nums.size() - 1); // 整体翻转后，再把前 k 个与后 n-k 个各自翻回",
     "reverse(nums, 0, k - 1);",
     "reverse(nums, k, nums.size() - 1);"
    ],
    "why": "solutionText 说明三步走：先整体翻转 reverse(0, n-1) 把后 k 个元素搬到数组前面（此时两段内部顺序是反的），再由下面已给出的 reverse(0,k-1) 和 reverse(k,n-1) 分别恢复两段段内顺序。故首行必须是整体翻转，缺了它元素根本没被搬运。",
    "wrongWhy": {
     "reverse(nums, 0, k - 1);": "填成翻转前 k 个，则整体翻转 reverse(0,n-1) 从未出现，后 k 个元素根本没被搬到数组前面，轮转完全没有发生；而下标 0..k-1 又与下一行 reverse(nums,0,k-1) 重复翻两次相当于原样，结果错误。",
     "reverse(nums, k, nums.size() - 1);": "填成翻转后 n-k 个，同样丢失了整体翻转这一关键步骤，元素没有被搬运到位；且下标 k..n-1 与下一行 reverse(nums,k,n-1) 重复翻两次，结果错误。"
    }
   }
  ]
 },
 {
  "id": 198,
  "title": "198. 打家劫舍",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，<strong>如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警</strong>。</p>\n\n<p>给定一个代表每个房屋存放金额的非负整数数组，计算你<strong> 不触动警报装置的情况下 </strong>，一夜之内能够偷窃到的最高金额。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>[1,2,3,1]\n<strong>输出：</strong>4\n<strong>解释：</strong>偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。\n     偷窃到的最高金额 = 1 + 3 = 4 。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>[2,7,9,3,1]\n<strong>输出：</strong>12\n<strong>解释：</strong>偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。\n     偷窃到的最高金额 = 2 + 9 + 1 = 12 。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= nums.length <= 100</code></li>\n\t<li><code>0 <= nums[i] <= 400</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        if (nums.empty()) {\n            return 0;\n        }\n        int size = nums.size();\n        if (size == 1) {\n            return nums[0];\n        }\n        int first = nums[0], second = max(nums[0], nums[1]); // first=dp[i-2]，second=dp[i-1]\n        for (int i = 2; i < size; i++) {\n            int temp = second;\n            second = max(first + nums[i], second); // 偷第 i 间（first+nums[i]）或不偷（second）\n            first = temp;\n        }\n        return second;\n    }\n};",
  "cards": [
   {
    "id": "p198-empty-return-value",
    "crux": "空数组特判时返回值必须是 0，不能直接访问 nums[0]",
    "answer": "0",
    "blankOffset": 105,
    "blankLen": 1,
    "options": [
     "0",
     "nums[0]",
     "-1",
     "1"
    ],
    "why": "空数组没有房子可偷，最大金额语义上就是 0；此时数组为空，任何下标访问都是越界。",
    "wrongWhy": {
     "1": "没有任何依据支持返回 1，属于凭空捏造的魔法数字",
     "nums[0]": "数组为空时访问 nums[0] 是越界访问（未定义行为），程序会崩溃或读到脏数据",
     "-1": "偷窃金额语义上不应为负数，返回 -1 与「没有房子可偷、收益为 0」的题意矛盾"
    }
   },
   {
    "id": "p198-single-house-check",
    "crux": "只有恰好一间房时才提前返回 nums[0]，条件必须是等号",
    "answer": "==",
    "blankOffset": 167,
    "blankLen": 2,
    "options": [
     "==",
     ">=",
     ">"
    ],
    "why": "此处只想处理「size 恰好为 1」这一特殊边界，之后的循环从 i=2 开始才能正确处理 size>1 的情形。",
    "wrongWhy": {
     ">=": "前面已经排除了空数组，此处 size>=1 恒为真，会导致所有房间数都直接返回 nums[0]，后面的动态规划循环永远不会执行，多间房的情况全部算错",
     ">": "当 size>1（如 2、3 间房）时也会被提前拦截返回 nums[0]，丢弃了其余房间的信息，结果偏小且错误"
    }
   },
   {
    "id": "p198-second-init-nums1",
    "crux": "second 的初始值必须是前两间房的较大值，不能漏掉 nums[1]",
    "answer": "nums[1]",
    "blankOffset": 264,
    "blankLen": 7,
    "options": [
     "nums[1]",
     "nums[0]",
     "0"
    ],
    "why": "second 对应 dp[1]=max(nums[0], nums[1])，表示只考虑前两间房时能偷到的最大金额，必须真正比较第二间房的金额。",
    "wrongWhy": {
     "0": "second 会被错误初始化为 nums[0]（因为 max(nums[0],0) 在 nums[0]>=0 时等于 nums[0]），本质上还是丢失了第二间房的信息，且当只有两间房时最终结果会偏小",
     "nums[0]": "写成 max(nums[0], nums[0]) 恒等于 nums[0]，完全忽略了第二间房的金额，当 nums[1] 更大时 dp[1] 算错"
    }
   },
   {
    "id": "p198-loop-start-index",
    "crux": "递推循环必须从下标 2 开始，因为前两项已被 first/second 初始化占用",
    "answer": "2",
    "blankOffset": 327,
    "blankLen": 1,
    "options": [
     "2",
     "1",
     "0"
    ],
    "why": "first 和 second 已经分别代表 dp[0] 和 dp[1]，循环只需要从第 3 间房（下标 2）开始递推剩余房间。",
    "wrongWhy": {
     "0": "从下标 0 开始会在第一轮就用 nums[0] 覆盖 first/second，把之前正确初始化的 dp[0]、dp[1] 状态全部冲掉，结果完全错误",
     "1": "下标 1 的房间已经在 second 初始化时处理过，重复用 i=1 进入循环会用已经算好的 dp[1] 覆盖自己，破坏滚动变量的正确关系"
    }
   },
   {
    "id": "p198-loop-bound-strict-less",
    "crux": "循环条件必须是严格小于 size，防止访问越界下标",
    "answer": "<",
    "blankOffset": 332,
    "blankLen": 1,
    "options": [
     "<",
     "<="
    ],
    "why": "nums 合法下标范围是 0 到 size-1，循环体内会执行 nums[i]，所以 i 的最大合法取值是 size-1，条件必须用严格小于。",
    "wrongWhy": {
     "<=": "当 i 等于 size 时循环体仍会执行，访问 nums[size] 越界，是未定义行为，可能崩溃或读到脏数据"
    }
   },
   {
    "id": "p198-first-rolls-old-second",
    "crux": "first 必须保存的是本轮更新前的 second（用 temp 暂存），不能直接用更新后的值",
    "answer": "temp",
    "blankOffset": 485,
    "blankLen": 4,
    "options": [
     "temp",
     "second",
     "first"
    ],
    "why": "first 要滚动到「上一轮的 second」（即 dp[i-1]），必须提前用 temp 把更新前的旧 second 存住，再赋给 first，否则会用到已经被覆盖的新值。",
    "wrongWhy": {
     "second": "此时 second 已经被更新为本轮新算出的 dp[i]，把它赋给 first 会让 first 和 second 变成同一个值，破坏了 dp[i-2]/dp[i-1] 的滚动关系，后续所有递推结果都会错",
     "first": "first 保持不变，滚动变量完全没有前进，等价于每一轮都用最初的 first 参与计算，与真实的 dp 递推脱节，结果错误"
    }
   }
  ]
 },
 {
  "id": 199,
  "title": "199. 二叉树的右视图",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给定一个二叉树的 <strong>根节点</strong> <code>root</code>，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = [1,2,3,null,5,null,4]</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,3,4]</span></p>\n\n<p><strong>解释：</strong></p>\n\n<p></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = [1,2,3,4,null,null,null,5]</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>[1,3,4,5]</span></p>\n\n<p><strong>解释：</strong></p>\n\n<p></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><strong>输入：</strong><span class=\"example-io\">root = [1,null,3]</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,3]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 4：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>root = []</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[]</span></p>\n\n<p>&nbsp;</p>\n</div>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li>二叉树的节点个数的范围是 <code>[0,100]</code></li>\n\t<li><code>-100&nbsp;&lt;= Node.val &lt;= 100</code>&nbsp;</li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        unordered_map<int, int> rightmostValueAtDepth;\n        int max_depth = -1;\n\n        queue<TreeNode*> nodeQueue;\n        queue<int> depthQueue;\n        nodeQueue.push(root);\n        depthQueue.push(0);\n\n        while (!nodeQueue.empty()) {\n            TreeNode* node = nodeQueue.front();nodeQueue.pop();\n            int depth = depthQueue.front();depthQueue.pop();\n\n            if (node != NULL) {\n                // 维护二叉树的最大深度\n                max_depth = max(max_depth, depth);\n\n                // 由于每一层最后一个访问到的节点才是我们要的答案，因此不断更新对应深度的信息即可\n                rightmostValueAtDepth[depth] =  node -> val;\n\n                nodeQueue.push(node -> left);\n                nodeQueue.push(node -> right);\n                depthQueue.push(depth + 1);\n                depthQueue.push(depth + 1);\n            }\n        }\n\n        vector<int> rightView;\n        for (int depth = 0; depth <= max_depth; ++depth) {\n            rightView.push_back(rightmostValueAtDepth[depth]);\n        }\n\n        return rightView;\n    }\n};",
  "cards": [
   {
    "id": "p199-max-depth-init-minus-one",
    "crux": "max_depth 初始值必须是 -1，才能让空树正确返回空视图",
    "answer": "-1",
    "blankOffset": 152,
    "blankLen": 2,
    "options": [
     "-1",
     "0",
     "1"
    ],
    "why": "root 为空时循环体内 if (node != NULL) 直接跳过，max_depth 永远不会被更新，只能靠初始值本身来保证最后的收集循环 depth <= max_depth 不执行任何一次，从而返回空 vector；只有 -1 能让 0 <= max_depth 从一开始就为假。",
    "wrongWhy": {
     "0": "空树时 0 <= 0 为真，会去访问哈希表中并不存在的 rightmostValueAtDepth[0]，unordered_map 的 operator[] 会默认构造出值 0 并插入，最终错误地返回 [0] 而不是空数组。",
     "1": "空树时不仅 depth=0 会被错误收集，depth=1 也会被收集（0<=1 且 1<=1 均成立），错误地返回 [0,0]，比初始化为 0 的错误更严重。"
    }
   },
   {
    "id": "p199-node-not-null-check",
    "crux": "出队后必须用 != NULL 判断非空节点才能继续处理，写反会导致空指针解引用崩溃",
    "answer": "!=",
    "blankOffset": 467,
    "blankLen": 2,
    "options": [
     "!=",
     "=="
    ],
    "why": "该 BFS 把空孩子也无条件 push 进队列（见后面 nodeQueue.push(node -> left/right) 不做判空），所以出队后必须先判断 node != NULL 才能安全访问 node->val，否则处理空节点时会解引用空指针。",
    "wrongWhy": {
     "==": "条件反转后只在 node 为空时才进入分支去执行 node -> val、node -> left 等操作，对空指针解引用会直接崩溃；同时真正的非空节点反而被跳过，右视图逻辑完全失效。"
    }
   },
   {
    "id": "p199-push-left-before-right",
    "crux": "子节点必须先 push left 再 push right，才能保证同层从左到右的出队顺序，让最后覆盖的值就是最右节点",
    "answer": "nodeQueue.push(node -> left);\n                nodeQueue.push(node -> right);",
    "blankOffset": 697,
    "blankLen": 76,
    "options": [
     "nodeQueue.push(node -> left);\n                nodeQueue.push(node -> right);",
     "nodeQueue.push(node -> right);\n                nodeQueue.push(node -> left);"
    ],
    "why": "题解依赖“同层节点严格从左到右出队、出队时无条件覆盖该深度的值”这一性质，最后一次覆盖自然是本层最右节点；这要求每个父节点都先把 left 压入队列、再压入 right，从而维持整层的从左到右顺序。",
    "wrongWhy": {
     "nodeQueue.push(node -> right);\n                nodeQueue.push(node -> left);": "先压右后压左会把同一对兄弟节点的出队顺序颠倒，导致左孩子在右孩子之后被访问、覆盖该深度的值，最终 rightmostValueAtDepth 记录的其实是左视图而不是右视图。"
    }
   },
   {
    "id": "p199-collect-loop-inclusive-bound",
    "crux": "收集答案时循环条件必须是 depth <= max_depth，遗漏等号会丢掉最深一层的结果",
    "answer": "<=",
    "blankOffset": 952,
    "blankLen": 2,
    "options": [
     "<=",
     "<"
    ],
    "why": "max_depth 记录的是树中出现过的最大深度（合法下标），必须让 depth 取到 max_depth 这一层才能把最深层的右视图值也收集进来，因此边界要用 <=。",
    "wrongWhy": {
     "<": "循环会在 depth == max_depth 时提前退出，导致最深一层（往往是右视图里最后也最关键的一个值）永远不会被 push_back，返回结果少了最后一个元素。"
    }
   }
  ]
 },
 {
  "id": 200,
  "title": "200. 岛屿数量",
  "category": "图论",
  "difficulty": "medium",
  "descHtml": "<p>给你一个由&nbsp;<code>'1'</code>（陆地）和 <code>'0'</code>（水）组成的的二维网格，请你计算网格中岛屿的数量。</p>\n\n<p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。</p>\n\n<p>此外，你可以假设该网格的四条边均被水包围。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [\n&nbsp; ['1','1','1','1','0'],\n&nbsp; ['1','1','0','1','0'],\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['0','0','0','0','0']\n]\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['1','1','0','0','0'],\n&nbsp; ['0','0','1','0','0'],\n&nbsp; ['0','0','0','1','1']\n]\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 300</code></li>\n\t<li><code>grid[i][j]</code> 的值为 <code>'0'</code> 或 <code>'1'</code></li>\n</ul>",
  "code": "class Solution {\nprivate:\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        int nr = grid.size();\n        int nc = grid[0].size();\n\n        grid[r][c] = '0'; // 访问即沉没，防止重复计数\n        if (r - 1 >= 0 && grid[r-1][c] == '1') dfs(grid, r - 1, c);\n        if (r + 1 < nr && grid[r+1][c] == '1') dfs(grid, r + 1, c);\n        if (c - 1 >= 0 && grid[r][c-1] == '1') dfs(grid, r, c - 1);\n        if (c + 1 < nc && grid[r][c+1] == '1') dfs(grid, r, c + 1);\n    }\n\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int nr = grid.size();\n        if (!nr) return 0;\n        int nc = grid[0].size();\n\n        int num_islands = 0;\n        for (int r = 0; r < nr; ++r) {\n            for (int c = 0; c < nc; ++c) {\n                if (grid[r][c] == '1') {\n                    ++num_islands;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n\n        return num_islands;\n    }\n};",
  "cards": [
   {
    "id": "p200-dfs-mark-visited-before-recurse",
    "crux": "DFS 必须先把当前格子标记为 '0'（沉岛），再对四个方向递归；顺序或标记值错了会导致无限递归或重复计数",
    "answer": "grid[r][c] = '0';",
    "blankOffset": 155,
    "blankLen": 17,
    "options": [
     "grid[r][c] = '0';",
     "grid[r][c] = '1';"
    ],
    "why": "官方题解明确指出「直接在原网格上标记，无需额外 visited 数组」——进入 dfs 后立刻把当前格子从 '1' 改成 '0'（沉岛），这样后续四个方向的递归再回头检查这个格子时它已经不是 '1' 了，天然防止重复访问和无限递归。",
    "wrongWhy": {
     "grid[r][c] = '1';": "把当前格子重新赋值为 '1'（等于没有真正沉岛），四个方向的递归互相之间会不断把对方重新判定为 '1' 并再次进入 dfs，形成无限递归（栈溢出），程序无法正常结束。"
    }
   },
   {
    "id": "p200-dfs-upper-bound-check",
    "crux": "向上方向递归前必须用 r - 1 >= 0 判断不越过网格上边界，写成 > 0 会漏掉第 0 行邻居的合法连通",
    "answer": ">= 0",
    "blankOffset": 207,
    "blankLen": 4,
    "options": [
     ">= 0",
     "> 0"
    ],
    "why": "题解讲解指出「进入前判断边界与是否为 '1'」，行下标 r-1 只要不小于 0（即 r-1 属于 [0, nr) 范围内）就是合法索引，所以判断条件必须是 r - 1 >= 0，这样当 r=1（上方是第 0 行）时仍能正确递归进去。",
    "wrongWhy": {
     "> 0": "当 r=1 时 r-1=0 是合法且需要访问的邻居，但 r-1 > 0 在这种情况下为假，会漏掉这次递归。例如网格第0行为 1 0 1、第1行为 1 1 1 时，从第1行向上进入 (0,2) 的路径被切断，(0,2) 残留的 '1' 会被主循环再次计数，导致同一座岛屿被多算成两座，最终岛屿计数偏多。"
    }
   }
  ]
 },
 {
  "id": 206,
  "title": "206. 反转链表",
  "category": "链表",
  "difficulty": "easy",
  "descHtml": "给你单链表的头节点 <code>head</code> ，请你反转链表，并返回反转后的链表。\n<div class=\"original__bRMd\">\n<div>\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,3,4,5]\n<strong>输出：</strong>[5,4,3,2,1]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2]\n<strong>输出：</strong>[2,1]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = []\n<strong>输出：</strong>[]\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点的数目范围是 <code>[0, 5000]</code></li>\n\t<li><code>-5000 <= Node.val <= 5000</code></li>\n</ul>\n\n<p> </p>\n\n<p><strong>进阶：</strong>链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？</p>\n</div>\n</div>",
  "code": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* next = curr->next; // 先暂存后继，防止改指针后断链\n            curr->next = prev; // 掉头：不变量是 prev 之前的部分已完成反转\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n};",
  "cards": [
   {
    "id": "p206-reverse-list-prev-init-nullptr",
    "crux": "prev 必须初始化为 nullptr，代表反转链表的末尾（新链表终点）",
    "answer": "nullptr",
    "blankOffset": 94,
    "blankLen": 7,
    "options": [
     "nullptr",
     "head",
     "curr",
     "new ListNode()"
    ],
    "why": "prev 表示“已反转部分”的头节点，反转开始前还没有任何节点被反转，所以 prev 必须是空指针；这样原链表的第一个节点在反转后其 next 会正确指向 nullptr，成为新链表的尾节点。",
    "wrongWhy": {
     "head": "curr 也从 head 出发，把 prev 也设成 head 会让 prev 与 curr 指向同一节点，第一次循环 curr->next = prev 会让该节点指向自己，形成自环。",
     "curr": "curr 在这行代码之后才声明和初始化，此处引用 curr 是编译错误（使用未声明的变量）。",
     "new ListNode()": "会多出一个无意义的哨兵节点挂在新链表末尾，导致反转后的链表多一个空节点，遍历会出错。"
    }
   },
   {
    "id": "p206-reverse-list-curr-init-head",
    "crux": "curr 必须从 head 出发，不能跳过第一个节点",
    "answer": "head",
    "blankOffset": 128,
    "blankLen": 4,
    "options": [
     "head",
     "head->next",
     "nullptr",
     "prev"
    ],
    "why": "curr 代表“当前待反转”的节点，必须从原链表的第一个节点 head 开始遍历，否则第一个节点永远不会被处理。",
    "wrongWhy": {
     "head->next": "会直接跳过原链表第一个节点，导致该节点既没有被反转也脱离了整条链表，造成节点丢失。",
     "nullptr": "循环条件 while(curr) 直接为假，循环体一次都不执行，函数直接返回 prev（即 nullptr），整个链表没有被反转。",
     "prev": "此时 prev 已经是 nullptr，效果等同于把 curr 设为空，同样导致循环不执行。"
    }
   },
   {
    "id": "p206-reverse-list-save-next-before-overwrite",
    "crux": "必须先把 curr->next 存到 next 变量里，再去修改 curr->next 的指向，否则原链表会在此处断裂",
    "answer": "curr->next",
    "blankOffset": 186,
    "blankLen": 10,
    "options": [
     "curr->next",
     "prev",
     "curr",
     "next"
    ],
    "why": "curr->next 是遍历到下一个节点的唯一途径，一旦下一行把 curr->next 改成指向 prev，原来的后继信息就永久丢失了，所以必须先用 next 把它备份下来。",
    "wrongWhy": {
     "prev": "存的是上一个节点而不是原本的后继节点，下一行改指针后就再也找不到原链表剩余部分；首轮 prev 为 nullptr，会让 curr 立即变空、循环提前结束，只反转了一个节点。",
     "curr": "next 会被赋成 curr 自身，之后 curr = next 相当于 curr 不变，无法前移到下一个节点，遍历卡死。",
     "next": "用自身（此时尚未初始化）给自己赋值是未定义行为，无法正确暂存后继节点。"
    }
   },
   {
    "id": "p206-reverse-list-loop-condition-curr",
    "crux": "循环条件要用 curr（当前节点非空）而不是 curr->next，否则会漏掉最后一个节点",
    "answer": "curr",
    "blankOffset": 149,
    "blankLen": 4,
    "options": [
     "curr",
     "curr->next",
     "curr != head",
     "next"
    ],
    "why": "循环需要处理到链表最后一个节点为止，判断“curr 是否为空”才能保证遍历到真正的表尾；用 curr->next 判断会在 curr 是最后一个节点时提前退出循环，导致最后一个节点没有被反转。",
    "wrongWhy": {
     "curr->next": "当 curr 是原链表最后一个节点时 curr->next 为空，循环提前结束，最后一个节点不会被处理（它的 next 没被改成 prev），导致反转后的链表在末尾断开或形成环。",
     "curr != head": "curr 初始就等于 head，第一次判断 curr != head 即为假，循环体一次都不执行，函数直接返回 prev（即 nullptr），链表完全没被反转。",
     "next": "next 在循环体内才声明，循环条件里引用尚未声明的变量会导致编译错误。"
    }
   },
   {
    "id": "p206-reverse-list-return-prev",
    "crux": "循环结束后要返回 prev（新的头节点），而不是已经变成 nullptr 的 curr",
    "answer": "prev",
    "blankOffset": 349,
    "blankLen": 4,
    "options": [
     "prev",
     "curr",
     "head",
     "next"
    ],
    "why": "循环退出时 curr 已经等于 nullptr（遍历到末尾），而 prev 恰好停在原链表最后一个节点上，也就是反转后新链表的头节点，所以要返回 prev。",
    "wrongWhy": {
     "curr": "循环结束时 curr 恒为 nullptr，返回它等于返回空链表，调用方拿到的永远是 nullptr。",
     "head": "head 仍指向原链表第一个节点，反转后它已经是新链表的尾节点（next 为 nullptr），返回它会让上层只看到一个孤立节点。",
     "next": "next 是循环体内的局部变量，循环外已经离开作用域，无法在 return 语句处使用，属于编译错误。"
    }
   }
  ]
 },
 {
  "id": 207,
  "title": "207. 课程表",
  "category": "图论",
  "difficulty": "medium",
  "descHtml": "<p>你这个学期必须选修 <code>numCourses</code> 门课程，记为&nbsp;<code>0</code>&nbsp;到&nbsp;<code>numCourses - 1</code> 。</p>\n\n<p>在选修某些课程之前需要一些先修课程。 先修课程按数组&nbsp;<code>prerequisites</code> 给出，其中&nbsp;<code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> ，表示如果要学习课程&nbsp;<code>a<sub>i</sub></code> 则 <strong>必须</strong> 先学习课程&nbsp; <code>b<sub>i</sub></code><sub> </sub>。</p>\n\n<ul>\n\t<li>例如，先修课程对&nbsp;<code>[0, 1]</code> 表示：想要学习课程 <code>0</code> ，你需要先完成课程 <code>1</code> 。</li>\n</ul>\n\n<p>请你判断是否可能完成所有课程的学习？如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0]]\n<strong>输出：</strong>true\n<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>输出：</strong>false\n<strong>解释：</strong>总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= numCourses &lt;= 2000</code></li>\n\t<li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li>\n\t<li><code>prerequisites[i].length == 2</code></li>\n\t<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li>\n\t<li><code>prerequisites[i]</code> 中的所有课程对 <strong>互不相同</strong></li>\n</ul>",
  "code": "class Solution {\nprivate:\n    vector<vector<int>> edges;\n    vector<int> indeg;\n\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        edges.resize(numCourses);\n        indeg.resize(numCourses);\n        for (const auto& info: prerequisites) {\n            edges[info[1]].push_back(info[0]); // 先修课指向后续课\n            ++indeg[info[0]];\n        }\n\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (indeg[i] == 0) {\n                q.push(i);\n            }\n        }\n\n        int visited = 0;\n        while (!q.empty()) {\n            ++visited;\n            int u = q.front();\n            q.pop();\n            for (int v: edges[u]) {\n                --indeg[v];\n                if (indeg[v] == 0) {\n                    q.push(v);\n                }\n            }\n        }\n\n        return visited == numCourses; // 全部课都能出队 ⇔ 图中无环\n    }\n};",
  "cards": [
   {
    "id": "p207-edge-build-direction",
    "crux": "邻接表建边时，先修课/后续课的下标方向容易写反",
    "answer": "info[1]",
    "blankOffset": 296,
    "blankLen": 7,
    "options": [
     "info[1]",
     "info[0]"
    ],
    "why": "prerequisites[i] = [a, b] 表示要学 a 必须先学 b，即边应从先修课 b（info[1]）指向后续课 a（info[0]）：edges[info[1]].push_back(info[0])。这样才能保证 indeg[info[0]] 统计的是『还差多少先修课没修』，且 BFS 从入度 0 的课出发能正确沿先修关系向后传播。",
    "wrongWhy": {
     "info[0]": "把边建成 edges[info[0]].push_back(info[1])，方向整个反了：后续课变成了指向先修课，入度统计的对象与实际含义相反，最终 BFS 遍历的拓扑顺序和入度归零逻辑全部错乱，canFinish 的结果会不可靠（很多有环/无环样例都会算错）。"
    }
   },
   {
    "id": "p207-initial-queue-seed-condition",
    "crux": "初始入队条件必须是入度恰好为 0，不能用其他比较符",
    "answer": "==",
    "blankOffset": 472,
    "blankLen": 2,
    "options": [
     "==",
     ">",
     "!="
    ],
    "why": "入度为 0 意味着这门课没有任何先修依赖，可以立即修，是拓扑排序 BFS 的合法起点；只有严格等于 0 才代表『没有未满足的先修课』。",
    "wrongWhy": {
     ">": "写成 indeg[i] > 0 会把还有先修依赖、根本不能修的课程当成起点提前入队，直接破坏拓扑序，visited 计数和后续 --indeg 的遍历会完全错乱。",
     "!=": "写成 indeg[i] != 0 同样会把有先修依赖的课程当成起点入队，且入度为 0 的课反而被排除在外，逻辑与题意相反。"
    }
   },
   {
    "id": "p207-final-visited-equality-check",
    "crux": "最终判断必须是 visited 等于总课程数（==），不能写反",
    "answer": "==",
    "blankOffset": 859,
    "blankLen": 2,
    "options": [
     "==",
     "!="
    ],
    "why": "BFS 拓扑排序中，只有当所有课程都能顺利出队（visited 最终等于 numCourses）才说明图中不存在环，可以修完全部课程；这是判环的核心不变量。",
    "wrongWhy": {
     "!=": "写成 visited != numCourses 会把判断结果整个取反：有环（修不完，visited 小于总数）时反而返回 true，无环（能修完）时反而返回 false，函数的语义完全颠倒。"
    }
   }
  ]
 },
 {
  "id": 208,
  "title": "208. 实现 Trie (前缀树)",
  "category": "图论",
  "difficulty": "medium",
  "descHtml": "<p><strong><a href=\"https://baike.baidu.com/item/字典树/9825209?fr=aladdin\" target=\"_blank\">Trie</a></strong>（发音类似 \"try\"）或者说 <strong>前缀树</strong> 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。</p>\n\n<p>请你实现 Trie 类：</p>\n\n<ul>\n\t<li><code>Trie()</code> 初始化前缀树对象。</li>\n\t<li><code>void insert(String word)</code> 向前缀树中插入字符串 <code>word</code> 。</li>\n\t<li><code>boolean search(String word)</code> 如果字符串 <code>word</code> 在前缀树中，返回 <code>true</code>（即，在检索之前已经插入）；否则，返回 <code>false</code> 。</li>\n\t<li><code>boolean startsWith(String prefix)</code> 如果之前已经插入的字符串&nbsp;<code>word</code> 的前缀之一为 <code>prefix</code> ，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>示例：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"]\n[[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]\n<strong>输出</strong>\n[null, null, true, false, true, null, true]\n\n<strong>解释</strong>\nTrie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\");   // 返回 True\ntrie.search(\"app\");     // 返回 False\ntrie.startsWith(\"app\"); // 返回 True\ntrie.insert(\"app\");\ntrie.search(\"app\");     // 返回 True\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li>\n\t<li><code>word</code> 和 <code>prefix</code> 仅由小写英文字母组成</li>\n\t<li><code>insert</code>、<code>search</code> 和 <code>startsWith</code> 调用次数 <strong>总计</strong> 不超过 <code>3 * 10<sup>4</sup></code> 次</li>\n</ul>",
  "code": "class Trie {\nprivate:\n    vector<Trie*> children;\n    bool isEnd;\n\n    Trie* searchPrefix(string prefix) {\n        Trie* node = this;\n        for (char ch : prefix) {\n            ch -= 'a';\n            if (node->children[ch] == nullptr) {\n                return nullptr;\n            }\n            node = node->children[ch];\n        }\n        return node;\n    }\n\npublic:\n    Trie() : children(26), isEnd(false) {}\n\n    void insert(string word) {\n        Trie* node = this;\n        for (char ch : word) {\n            ch -= 'a';\n            if (node->children[ch] == nullptr) {\n                node->children[ch] = new Trie();\n            }\n            node = node->children[ch];\n        }\n        node->isEnd = true; // 单词结尾打标记\n    }\n\n    bool search(string word) {\n        Trie* node = this->searchPrefix(word);\n        return node != nullptr && node->isEnd;\n    }\n\n    bool startsWith(string prefix) {\n        return this->searchPrefix(prefix) != nullptr;\n    }\n};",
  "cards": [
   {
    "id": "p208-trie-search-null-then-isend-order",
    "crux": "search 中先判空、且用 && 短路才能安全访问 isEnd",
    "answer": "node != nullptr && node->isEnd",
    "blankOffset": 826,
    "blankLen": 30,
    "options": [
     "node != nullptr && node->isEnd",
     "node->isEnd && node != nullptr",
     "node != nullptr || node->isEnd",
     "node->isEnd"
    ],
    "why": "solutionText 指出 search 要求「找到末端节点且该节点 isEnd 为真」；C++ 的 && 具有短路求值，先判 node != nullptr 为假就不会再访问 node->isEnd，避免空指针解引用，顺序和运算符都不能变。",
    "wrongWhy": {
     "node->isEnd && node != nullptr": "把判空放到后面，当 node 为 nullptr 时会先执行 node->isEnd 解引用空指针，程序崩溃（未定义行为）。",
     "node != nullptr || node->isEnd": "用 || 会导致只要前缀路径存在（node 非空）就直接返回 true，而不再检查是否真的是完整单词的结尾，把 search 和 startsWith 的语义混淆。",
     "node->isEnd": "完全没有判空，当单词不存在于 Trie（searchPrefix 返回 nullptr）时会直接解引用空指针崩溃。"
    }
   },
   {
    "id": "p208-trie-startswith-only-check-nonnull",
    "crux": "startsWith 只需节点存在，不需要 isEnd",
    "answer": "this->searchPrefix(prefix) != nullptr",
    "blankOffset": 917,
    "blankLen": 37,
    "options": [
     "this->searchPrefix(prefix) != nullptr",
     "this->searchPrefix(prefix) != nullptr && this->searchPrefix(prefix)->isEnd",
     "this->searchPrefix(prefix) == nullptr",
     "this->search(prefix)"
    ],
    "why": "solutionText 说 search 和 startsWith 共用 searchPrefix，区别仅在于 search 额外要求 isEnd 为真；startsWith 只表示「存在以此为前缀的路径」，找到节点（非空）即可返回 true，不应再检查 isEnd。",
    "wrongWhy": {
     "this->searchPrefix(prefix) != nullptr && this->searchPrefix(prefix)->isEnd": "把 search 的 isEnd 判断错误地搬到了 startsWith 里，会导致例如插入 \"apple\" 后 startsWith(\"app\") 本应为 true 却被误判为 false（因为 \"app\" 节点的 isEnd 是 false）。",
     "this->searchPrefix(prefix) == nullptr": "把相等关系写反，前缀存在时返回 false、不存在时返回 true，逻辑完全颠倒。",
     "this->search(prefix)": "错误地复用了要求完整单词匹配（isEnd 为真）的 search，导致只有完整插入过的单词才被判定为“有此前缀”，非完整单词的合法前缀会被误判为不存在。"
    }
   }
  ]
 },
 {
  "id": 215,
  "title": "215. 数组中的第K个最大元素",
  "category": "堆",
  "difficulty": "medium",
  "descHtml": "<p>给定整数数组 <code>nums</code> 和整数 <code>k</code>，请返回数组中第 <code><strong>k</strong></code> 个最大的元素。</p>\n\n<p>请注意，你需要找的是数组排序后的第 <code>k</code> 个最大的元素，而不是第 <code>k</code> 个不同的元素。</p>\n\n<p>你必须设计并实现时间复杂度为 <code>O(n)</code> 的算法解决此问题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> <code>[3,2,1,5,6,4],</code> k = 2\n<strong>输出:</strong> 5\n</pre>\n\n<p><strong>示例&nbsp;2:</strong></p>\n\n<pre>\n<strong>输入:</strong> <code>[3,2,3,1,2,4,5,5,6], </code>k = 4\n<strong>输出:</strong> 4</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示： </strong></p>\n\n<ul>\n\t<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int quickselect(vector<int> &nums, int l, int r, int k) {\n        if (l == r) {\n            return nums[k];\n        }\n        int partition = nums[l], i = l - 1, j = r + 1;\n        while (i < j) {\n            do i++; while (nums[i] < partition);\n            do j--; while (nums[j] > partition);\n            if (i < j) {\n                swap(nums[i], nums[j]);\n            }\n        }\n        if (k <= j) { // 目标下标在左半，只递归一侧\n            return quickselect(nums, l, j, k);\n        }\n        return quickselect(nums, j + 1, r, k);\n    }\n\n    int findKthLargest(vector<int> &nums, int k) {\n        int n = nums.size();\n        return quickselect(nums, 0, n - 1, n - k); // 第 k 大 = 升序排列后下标 n-k 的元素\n    }\n};",
  "cards": [
   {
    "id": "p215-hoare-i-init-offset",
    "crux": "Hoare划分中 i 的初始偏移量为什么必须是 l-1",
    "answer": "l - 1",
    "blankOffset": 184,
    "blankLen": 5,
    "options": [
     "l - 1",
     "l",
     "l + 1"
    ],
    "why": "do-while 结构先执行 i++ 再判断循环条件，所以扫描指针 i 要预置成比左边界小 1，这样第一次自增后 i 恰好等于 l，从最左端开始比较，这是 Hoare 双指针 do-while 写法的标准偏移量。",
    "wrongWhy": {
     "l": "第一次自增后 i 会变成 l+1，直接跳过了下标 l 处的元素参与首轮比较，导致该位置的值永远不会被 i 指针检查到，划分结果可能出错。",
     "l + 1": "偏移量更大，第一次自增后 i 变成 l+2，会跳过两个位置的检查，破坏划分正确性，且更容易越界。"
    }
   },
   {
    "id": "p215-hoare-j-init-offset",
    "crux": "Hoare划分中 j 的初始偏移量为什么必须是 r+1",
    "answer": "r + 1",
    "blankOffset": 195,
    "blankLen": 5,
    "options": [
     "r + 1",
     "r",
     "r - 1"
    ],
    "why": "do j--; 同样是先自减再判断，所以 j 要预置为比右边界大 1，这样第一次自减后 j 恰好等于 r，从最右端开始向左扫描。",
    "wrongWhy": {
     "r": "第一次自减后 j 变成 r-1，跳过了最右端下标 r 处元素的比较，可能导致该元素未被正确划分。",
     "r - 1": "偏移更大，第一次自减后 j 变成 r-2，跳过两个位置，破坏划分正确性并可能提前越界。"
    }
   },
   {
    "id": "p215-hoare-i-scan-basis",
    "crux": "i 指针扫描比较的基准必须是缓存的 partition，而不是 nums[l]",
    "answer": "partition",
    "blankOffset": 263,
    "blankLen": 9,
    "options": [
     "partition",
     "nums[l]",
     "partition + 1"
    ],
    "why": "partition 在函数开头保存的是 nums[l] 当时的值（值拷贝），后续 do-while 循环中会不断 swap 数组元素，nums[l] 位置上的值会发生变化；必须用缓存下来的 partition 常量做比较基准，否则基准会随交换漂移。",
    "wrongWhy": {
     "nums[l]": "循环体内已经发生过 swap(nums[i], nums[j])，一旦 nums[l] 位置的值被换动过，再用 nums[l] 当基准就不再是最初的 pivot 值，导致划分标准前后不一致，产生错误甚至死循环。",
     "partition + 1": "把比较阈值人为抬高 1，会让原本恰好等于 partition 的元素被误判为小于阈值继续被跳过，破坏 Hoare 划分中相等元素的处理语义，可能导致 i 无法在正确位置停下甚至死循环。"
    }
   },
   {
    "id": "p215-hoare-j-scan-basis",
    "crux": "j 指针扫描比较的基准必须是缓存的 partition，而不是 nums[l]",
    "answer": "partition",
    "blankOffset": 312,
    "blankLen": 9,
    "options": [
     "partition",
     "nums[l]",
     "partition - 1"
    ],
    "why": "与 i 指针同理，j 指针也必须用函数开头缓存下来的 partition 值做比较基准，而不能用可能已被 swap 改变的 nums[l]，否则划分基准会随数组交换而漂移。",
    "wrongWhy": {
     "nums[l]": "nums[l] 位置的值在划分过程中可能已被 swap 改变，不再代表最初的 pivot 值，用它做基准会导致左右两侧的划分标准不一致。",
     "partition - 1": "把阈值调低 1，会让原本恰好等于 partition 的元素被误判为大于阈值继续被跳过，同样破坏划分语义，可能导致死循环。"
    }
   },
   {
    "id": "p215-recursion-branch-boundary",
    "crux": "判断目标下标落在左半区间时为什么用 k <= j 而不是 k < j",
    "answer": "k <= j",
    "blankOffset": 425,
    "blankLen": 6,
    "options": [
     "k <= j",
     "k < j",
     "k <= i"
    ],
    "why": "Hoare 划分结束后数组被分成 [l, j] 与 [j+1, r] 两段闭区间，且左段所有值都不大于右段；j 是左段的最后一个下标，所以目标下标 k 只要不超过 j（即 k <= j）就说明落在左半区间，必须用 <= 才能包含 k==j 这一临界情况。",
    "wrongWhy": {
     "k < j": "漏掉了 k == j 这一临界情况：此时目标其实就在左区间 [l, j] 的最后一个位置，却会被错误地导向右半 [j+1, r] 递归，导致漏掉正确元素，结果出错。",
     "k <= i": "i 是划分后右侧扫描指针最终停下的位置，与 j 不是同一个边界（循环结束时通常 i >= j+1），用 i 做分割点判断混淆了左右子区间的真实边界，会导致递归范围计算错误。"
    }
   },
   {
    "id": "p215-kth-largest-index-convert",
    "crux": "第 k 大转换成升序数组下标时为什么是 n - k",
    "answer": "n - k",
    "blankOffset": 686,
    "blankLen": 5,
    "options": [
     "n - k",
     "k - 1",
     "n - k - 1"
    ],
    "why": "数组升序排序后，第 k 大的元素恰好位于下标 n-k 处（0 下标计数），例如第 1 大对应下标 n-1，第 n 大（也就是最小值）对应下标 0；所以查找第 k 大就应该在升序序列中递归查找下标为 n-k 的元素。",
    "wrongWhy": {
     "k - 1": "k-1 是求'第 k 小'元素在升序数组中的下标写法，用在这里会把问题误解成查找第 k 小的元素，结果与题目要求的第 k 大完全不符。",
     "n - k - 1": "整体多减了 1，实际查找的是下标 n-k-1 处的元素，对应的是'第 k+1 大'的元素，导致返回结果整体偏移一位。"
    }
   }
  ]
 },
 {
  "id": 226,
  "title": "226. 翻转二叉树",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给你一棵二叉树的根节点 <code>root</code> ，翻转这棵二叉树，并返回其根节点。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>root = [4,2,7,1,3,6,9]\n<strong>输出：</strong>[4,7,2,9,6,3,1]\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>root = [2,1,3]\n<strong>输出：</strong>[2,3,1]\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = []\n<strong>输出：</strong>[]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目范围在 <code>[0, 100]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (root == nullptr) {\n            return nullptr;\n        }\n        TreeNode* left = invertTree(root->left); // 先递归翻转两棵子树，再交换挂回当前节点\n        TreeNode* right = invertTree(root->right);\n        root->left = right;\n        root->right = left;\n        return root;\n    }\n};",
  "cards": [
   {
    "id": "p226-invert-tree-null-check",
    "crux": "递归出口必须先判断当前节点 root 本身是否为空，而不是去看它的子节点",
    "answer": "root == nullptr",
    "blankOffset": 80,
    "blankLen": 15,
    "options": [
     "root == nullptr",
     "root->left == nullptr",
     "root->left == nullptr && root->right == nullptr",
     "root == nullptr || root->left == nullptr"
    ],
    "why": "递归会不断往下传 root->left / root->right，最终一定会传入 nullptr，所以出口条件必须直接判断传进来的 root 本身是否为空节点，命中就直接返回 nullptr，这是整个递归能够终止且不越界访问的前提。",
    "wrongWhy": {
     "root->left == nullptr": "当 root 本身就是 nullptr 时（递归传下来的空节点），root->left 是对空指针取成员，直接崩溃；而且叶子节点（左右都非空）永远不满足该条件，出口逻辑本身就是错的。",
     "root->left == nullptr && root->right == nullptr": "同样在 root 为 nullptr 时对空指针解引用 root->left、root->right 而崩溃；即便不崩溃，把出口定义成“叶子节点”也没有对应到递归真正需要拦截的“空节点”场景。",
     "root == nullptr || root->left == nullptr": "只要当前节点的左孩子为空（比如只有右子树的节点），就会提前返回 nullptr，把该节点自己和它的右子树整个丢弃，导致翻转后树结构残缺。"
    }
   },
   {
    "id": "p226-invert-tree-recursive-arg-swap",
    "crux": "left 变量必须递归传入 root->left（自己的左子树），不能和 right 那一行传反",
    "answer": "root->left",
    "blankOffset": 173,
    "blankLen": 10,
    "options": [
     "root->left",
     "root->right",
     "root",
     "root->left->left"
    ],
    "why": "后面的 root->left = right、root->right = left 是靠 left/right 分别对应“原左子树翻转结果”“原右子树翻转结果”来完成左右互换的；left 必须来自 invertTree(root->left)，这样最终赋值时才能把原右子树挂到左边、原左子树挂到右边，实现真正的左右交换。",
    "wrongWhy": {
     "root->right": "left 和 right 两个变量都变成对 root->right 的翻转结果，root->left = right、root->right = left 最终两侧都是原右子树的翻转版本，原左子树被直接丢弃，且顶层左右子树根本没有发生交换，只是各自内部翻转了一遍。",
     "root": "把整棵子树的根 root 自己传回递归，参数没有向下缩小（不是 root->left），会不断对同一个节点递归调用自身，导致无限递归、栈溢出。",
     "root->left->left": "跳过了 root->left 这一层直接翻转它的左孩子，root->left 这个节点本身没有被递归处理，翻转不完整，会漏掉一层子树结构。"
    }
   }
  ]
 },
 {
  "id": 230,
  "title": "230. 二叉搜索树中第 K 小的元素",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给定一个二叉搜索树的根节点 <code>root</code> ，和一个整数 <code>k</code> ，请你设计一个算法查找其中第&nbsp;<code>k</code><strong>&nbsp;</strong>小的元素（<code>k</code> 从 1 开始计数）。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [3,1,4,null,2], k = 1\n<strong>输出：</strong>1\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [5,3,6,2,4,null,null,1], k = 3\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中的节点数为 <code>n</code> 。</li>\n\t<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>\n\t<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 <code>k</code> 小的值，你将如何优化算法？</p>",
  "code": "class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        stack<TreeNode *> stack;\n        while (root != nullptr || stack.size() > 0) {\n            while (root != nullptr) {\n                stack.push(root);\n                root = root->left;\n            }\n            root = stack.top();\n            stack.pop();\n            --k; // 弹栈顺序即中序递增顺序，第 k 次弹出的就是第 k 小\n            if (k == 0) {\n                break;\n            }\n            root = root->right;\n        }\n        return root->val;\n    }\n};",
  "cards": [
   {
    "id": "p230-outer-loop-or-not-and",
    "crux": "外层循环条件必须用 || 而不是 &&，因为root耗尽和栈耗尽是两个独立的“还没走完”标志",
    "answer": "||",
    "blankOffset": 134,
    "blankLen": 2,
    "options": [
     "||",
     "&&"
    ],
    "why": "迭代中序遍历需要“只要左链没走完（root非空）或者栈里还有待处理节点（栈非空），就继续循环”；这两个条件是“或”的关系，任一成立都要继续，因此必须用 ||。题解外层循环写作“root 非空或栈非空”，与之一致。",
    "wrongWhy": {
     "&&": "改成 && 后，只有root非空且栈非空时才继续循环。当root已经走到最左端为nullptr、但栈中仍有未弹出的祖先节点时（这是遍历中间的正常状态），循环会被提前判为false而退出，导致遍历没完成就返回，函数提前结束、结果错误甚至访问未初始化的root->val。"
    }
   },
   {
    "id": "p230-kth-decrement-compare-zero",
    "crux": "--k 之后判断是否等于 0（而不是 1），因为比较发生在递减之后",
    "answer": "0",
    "blankOffset": 404,
    "blankLen": 1,
    "options": [
     "0",
     "1"
    ],
    "why": "k 初始为目标名次，每弹出一个节点就先执行 --k 再判断。当弹出第k个节点时，k 恰好从1减到0，此时判断 k==0 才是“已经处理到第k个节点”的正确时机，和题解描述的“减到 0 时刚弹出的节点就是第 k 小”一致。",
    "wrongWhy": {
     "1": "因为判断在 --k 之后进行，若写成 k==1，会在弹出第 k-1 个节点（此时 --k 后 k 值为1）时就提前 break，返回的是第 k-1 小的节点，结果整体偏移了一位，是典型的差一错误。"
    }
   }
  ]
 },
 {
  "id": 234,
  "title": "234. 回文链表",
  "category": "链表",
  "difficulty": "easy",
  "descHtml": "<p>给你一个单链表的头节点 <code>head</code> ，请你判断该链表是否为<span data-keyword=\"palindrome-sequence\">回文链表</span>。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2,2,1]\n<strong>输出：</strong>true\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>head = [1,2]\n<strong>输出：</strong>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>链表中节点数目在范围<code>[1, 10<sup>5</sup>]</code> 内</li>\n\t<li><code>0 &lt;= Node.val &lt;= 9</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你能否用&nbsp;<code>O(n)</code> 时间复杂度和 <code>O(1)</code> 空间复杂度解决此题？</p>",
  "code": "class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        if (head == nullptr) {\n            return true;\n        }\n\n        // 找到前半部分链表的尾节点并反转后半部分链表\n        ListNode* firstHalfEnd = endOfFirstHalf(head);\n        ListNode* secondHalfStart = reverseList(firstHalfEnd->next);\n\n        // 判断是否回文\n        ListNode* p1 = head;\n        ListNode* p2 = secondHalfStart;\n        bool result = true;\n        while (result && p2 != nullptr) {\n            if (p1->val != p2->val) {\n                result = false;\n            }\n            p1 = p1->next;\n            p2 = p2->next;\n        }\n\n        // 还原链表并返回结果\n        firstHalfEnd->next = reverseList(secondHalfStart);\n        return result;\n    }\n\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    ListNode* endOfFirstHalf(ListNode* head) {\n        ListNode* fast = head;\n        ListNode* slow = head;\n        while (fast->next != nullptr && fast->next->next != nullptr) {\n            fast = fast->next->next;\n            slow = slow->next;\n        }\n        return slow;\n    }\n};",
  "cards": [
   {
    "id": "p234-find-mid-fast-loop-condition",
    "crux": "endOfFirstHalf 用快慢指针找前半段尾节点时,循环条件必须同时判断 fast->next 和 fast->next->next 是否非空,少判断一层会越界,判断成 fast 本身会让停止位置错位",
    "answer": "fast->next != nullptr && fast->next->next != nullptr",
    "blankOffset": 1141,
    "blankLen": 52,
    "options": [
     "fast->next != nullptr && fast->next->next != nullptr",
     "fast != nullptr && fast->next != nullptr",
     "fast->next != nullptr"
    ],
    "why": "hints 里明确要求 fast 每次走两步(fast = fast->next->next),所以循环体内必须保证 fast->next 和 fast->next->next 都存在才能安全跳两步;同时这个条件决定了 slow 最终停在『前半段尾节点』——奇数长度时中间节点恰好留在前半段不参与比较,这正是 solutionText 强调的边界设计。",
    "wrongWhy": {
     "fast != nullptr && fast->next != nullptr": "这是标准『找中点(上中位)』的循环条件,它并不会崩溃:条件已保证 fast->next 非空,故 fast->next->next 只是一次安全读取(结果可能是 nullptr,只是赋值给 fast,不解引用)。真正的问题是它让 slow 在偶数长度时多走一步、停到后半段的第一个节点,firstHalfEnd 落进后半段导致前后半段错分——例如 1->2->3->1 会被误判为回文。它给出错误的分割位置,而非崩溃。",
     "fast->next != nullptr": "只保证 fast->next 非空,不保证 fast->next->next 存在。当 fast->next 是最后一个节点时,fast = fast->next->next 会把 fast 赋成 nullptr(这一步本身不崩);下一轮再求循环条件 fast->next 时,就对已为 nullptr 的 fast 解引用而崩溃(偶数长度链表必然触发)。"
    }
   },
   {
    "id": "p234-compare-loop-guard-p2-not-p1",
    "crux": "双指针逐节点比较时,循环条件必须用 p2 是否非空来控制(而不是 p1),因为前半段节点数总是大于等于后半段,先跑完的必然是 p2",
    "answer": "p2 != nullptr",
    "blankOffset": 430,
    "blankLen": 13,
    "options": [
     "p2 != nullptr",
     "p1 != nullptr",
     "p1 != nullptr || p2 != nullptr"
    ],
    "why": "hints 指出 p1 从 head 出发要走完整条链表(前半段更长或相等),p2 从 secondHalfStart(后半段)出发,后半段节点数总是小于等于前半段,所以 p2 一定先到达 nullptr;用 p2 作为循环终止条件既能保证不越界,又能让『p2 走完仍全相等即回文』这个判断成立。",
    "wrongWhy": {
     "p1 != nullptr": "奇数长度时前半段比后半段多一个节点,p1 到达 nullptr 之前 p2 早已到达 nullptr,此时循环仍会继续执行 p1->val != p2->val,对空指针 p2 解引用导致崩溃",
     "p1 != nullptr || p2 != nullptr": "p2 先到 nullptr 后,只要 p1 还非空,|| 条件仍为真,循环继续执行 p2->val,对已经为 nullptr 的 p2 解引用导致崩溃"
    }
   }
  ]
 },
 {
  "id": 236,
  "title": "236. 二叉树的最近公共祖先",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。</p>\n\n<p><a href=\"https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin\" target=\"_blank\">百度百科</a>中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（<strong>一个节点也可以是它自己的祖先</strong>）。”</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\n<strong>输出：</strong>3\n<strong>解释：</strong>节点 <code>5 </code>和节点 <code>1 </code>的最近公共祖先是节点 <code>3 。</code>\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\n<strong>输出：</strong>5\n<strong>解释：</strong>节点 <code>5 </code>和节点 <code>4 </code>的最近公共祖先是节点 <code>5 。</code>因为根据定义最近公共祖先节点可以为节点本身。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2], p = 1, q = 2\n<strong>输出：</strong>1\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[2, 10<sup>5</sup>]</code> 内。</li>\n\t<li><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code></li>\n\t<li>所有 <code>Node.val</code> <code>互不相同</code> 。</li>\n\t<li><code>p != q</code></li>\n\t<li><code>p</code> 和 <code>q</code> 均存在于给定的二叉树中。</li>\n</ul>",
  "code": "class Solution {\npublic:\n    TreeNode* ans;\n    bool dfs(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (root == nullptr) return false;\n        bool lson = dfs(root->left, p, q);\n        bool rson = dfs(root->right, p, q);\n        if ((lson && rson) || ((root->val == p->val || root->val == q->val) && (lson || rson))) {\n            ans = root; // p、q 分居两侧，或自身即是其一：root 就是最近公共祖先\n        }\n        return lson || rson || (root->val == p->val || root->val == q->val); // 返回：该子树是否包含 p 或 q\n    }\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        dfs(root, p, q);\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p236-base-case-return-false",
    "crux": "空节点的 dfs 返回值必须是 false，不能是 true",
    "answer": "false",
    "blankOffset": 137,
    "blankLen": 5,
    "options": [
     "false",
     "true"
    ],
    "why": "dfs 的语义是「该子树是否包含 p 或 q」，空子树显然不包含任何节点，必须返回 false，回溯时才能正确统计左右子树各自的包含情况。",
    "wrongWhy": {
     "true": "空节点会被误判为“包含 p 或 q”，导致所有叶子的父节点都会认为左右子树含有目标节点，从而把大量非祖先节点错误地标记为 ans，甚至根节点也会被误判为 LCA。"
    }
   },
   {
    "id": "p236-lca-condition-lson-and-rson",
    "crux": "判定“p、q 分居两侧”必须用 && 而不是 ||",
    "answer": "lson && rson",
    "blankOffset": 244,
    "blankLen": 12,
    "options": [
     "lson && rson",
     "lson || rson"
    ],
    "why": "只有当左右子树各自都包含 p、q 其中一个（即两侧都为真）时，当前节点才是把 p、q 分居两侧的那个分岔点，才是最近公共祖先。",
    "wrongWhy": {
     "lson || rson": "只要左右子树有一侧包含目标节点就判定为真，会把仅含单个目标节点、根本没有分岔的祖先节点也误判为 LCA，导致 ans 被过早（过高）地赋值为错误的祖先。"
    }
   },
   {
    "id": "p236-lca-condition-self-lson-or-rson",
    "crux": "root 自身是 p/q 时，只需另一个目标出现在某一侧子树（||），不能要求两侧都有（&&）",
    "answer": "lson || rson",
    "blankOffset": 311,
    "blankLen": 12,
    "options": [
     "lson || rson",
     "lson && rson"
    ],
    "why": "当 root 本身就是 p 或 q 时，另一个目标节点只可能出现在它的某一侧子树（不可能左右子树都有，因为 p、q 是两个不同节点），所以只需 lson || rson 成立即可判定 root 为最近公共祖先。",
    "wrongWhy": {
     "lson && rson": "要求左右子树都包含目标节点，但此时 root 自身已经是 p 或 q 之一，另一个目标节点不可能同时出现在左右两侧，这个条件永远无法满足（除非被前半部分 lson && rson 覆盖），导致 root 自身是 p/q 且另一个在子树里的这种 LCA 情形被漏判，ans 得不到正确赋值。"
    }
   },
   {
    "id": "p236-dfs-return-includes-self-check",
    "crux": "dfs 的返回值必须把“root 自身是否为 p/q”也 OR 进去，不能只返回 lson || rson",
    "answer": "lson || rson || (root->val == p->val || root->val == q->val)",
    "blankOffset": 412,
    "blankLen": 60,
    "options": [
     "lson || rson || (root->val == p->val || root->val == q->val)",
     "lson || rson"
    ],
    "why": "该子树“包含 p 或 q”不仅指左右子树里含有，还包括 root 自身就是 p 或 q 这一种情况，三者需要用 || 全部合并才能把信息正确地向上层传递。",
    "wrongWhy": {
     "lson || rson": "漏掉 root 自身是否为 p/q 的判断：当 root 恰好是 p 或 q，但其左右子树都不含另一个目标节点时，返回值会被错误地算成 false，导致父节点收不到“这一侧含有目标节点”的信息，从而使真正的最近公共祖先判定条件（lson && rson）在上层永远无法成立，ans 可能得不到正确赋值。"
    }
   }
  ]
 },
 {
  "id": 238,
  "title": "238. 除了自身以外数组的乘积",
  "category": "普通数组",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组&nbsp;<code>nums</code>，返回 数组&nbsp;<code>answer</code>&nbsp;，其中&nbsp;<code>answer[i]</code>&nbsp;等于&nbsp;<code>nums</code>&nbsp;中除了&nbsp;<code>nums[i]</code>&nbsp;之外其余各元素的乘积&nbsp;。</p>\n\n<p>题目数据 <strong>保证</strong> 数组&nbsp;<code>nums</code>之中任意元素的全部前缀元素和后缀的乘积都在&nbsp; <strong>32 位</strong> 整数范围内。</p>\n\n<p>请&nbsp;<strong>不要使用除法，</strong>且在&nbsp;<code>O(n)</code> 时间复杂度内完成此题。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[1,2,3,4]</code>\n<strong>输出:</strong> <code>[24,12,8,6]</code>\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = [-1,1,0,-3,3]\n<strong>输出:</strong> [0,0,9,0,0]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-30 &lt;= nums[i] &lt;= 30</code></li>\n\t<li>输入&nbsp;<strong>保证</strong> 数组&nbsp;<code>answer[i]</code>&nbsp;在&nbsp; <strong>32 位</strong> 整数范围内</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你可以在 <code>O(1)</code>&nbsp;的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组&nbsp;<strong>不被视为&nbsp;</strong>额外空间。）</p>",
  "code": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int length = nums.size();\n        vector<int> answer(length);\n\n        // answer[i] 表示索引 i 左侧所有元素的乘积\n        // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1\n        answer[0] = 1;\n        for (int i = 1; i < length; i++) {\n            answer[i] = nums[i - 1] * answer[i - 1];\n        }\n\n        // R 为右侧所有元素的乘积\n        // 刚开始右边没有元素，所以 R = 1\n        int R = 1;\n        for (int i = length - 1; i >= 0; i--) {\n            // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R\n            answer[i] = answer[i] * R;\n            // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上\n            R *= nums[i];\n        }\n        return answer;\n    }\n};",
  "cards": [
   {
    "id": "p238-answer0-empty-product-init",
    "crux": "answer[0] 左侧没有元素，空积必须初始化为 1",
    "answer": "1",
    "blankOffset": 258,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "nums[0]"
    ],
    "why": "solutionText 明确：索引 0 左侧没有元素，空积按乘法单位元记为 1，作为后续前缀积递推的起点。",
    "wrongWhy": {
     "0": "把空积当成 0，后面所有 answer[i] = nums[i-1]*answer[i-1] 都会被连乘 0 污染，整个数组全变 0。",
     "nums[0]": "把自身的值当成左侧前缀积，语义错误，answer[0] 本应表示“不含自身”的乘积。"
    }
   },
   {
    "id": "p238-prefix-loop-start-index",
    "crux": "前缀积循环必须从 i=1 开始，避免访问 nums[-1]",
    "answer": "1",
    "blankOffset": 282,
    "blankLen": 1,
    "options": [
     "1",
     "0"
    ],
    "why": "answer[0] 已单独初始化为 1，循环体里用到 nums[i-1]，若从 0 开始会访问 nums[-1]，越界读取未定义内存。",
    "wrongWhy": {
     "0": "i=0 时 nums[i-1] 就是 nums[-1]，数组越界访问，行为未定义，且会重复覆盖已初始化的 answer[0]。"
    }
   },
   {
    "id": "p238-prefix-product-index-offset",
    "crux": "前缀积递推用的是左邻居 nums[i-1]，不能写成 nums[i] 自身",
    "answer": "nums[i - 1]",
    "blankOffset": 328,
    "blankLen": 11,
    "options": [
     "nums[i - 1]",
     "nums[i]",
     "nums[i + 1]"
    ],
    "why": "answer[i] 表示 i 左侧所有元素的乘积，需要把上一个前缀积 answer[i-1] 乘上刚好新纳入的那个左邻居 nums[i-1]，不能包含 nums[i] 自己。",
    "wrongWhy": {
     "nums[i]": "这是前缀积循环，应累乘到左邻居 nums[i-1] 为止；写成 nums[i] 会把当前元素也算进它自己的左前缀，前缀整体错位、结果错误。",
     "nums[i + 1]": "多用了尚未处理到的右侧元素，逻辑错位且在 i=length-1 时会越界访问 nums[length]。"
    }
   },
   {
    "id": "p238-suffix-running-product-init",
    "crux": "右侧滚动乘积变量 R 的初值也是空积，必须为 1",
    "answer": "1",
    "blankOffset": 438,
    "blankLen": 1,
    "options": [
     "1",
     "0"
    ],
    "why": "solutionText 指出：刚开始右边没有元素，右侧空积同样是乘法单位元 1，才能保证第一次 answer[i] *= R 不破坏已算好的前缀积。",
    "wrongWhy": {
     "0": "R 从 0 开始，第一次 answer[length-1] *= R 就把整个结果清零，随后 R 又被乘上 nums[i] 仍为 0，导致所有结果全部为 0。"
    }
   },
   {
    "id": "p238-suffix-loop-boundary-i0",
    "crux": "第二趟循环边界必须是 i >= 0，覆盖索引 0 这个元素",
    "answer": ">=",
    "blankOffset": 476,
    "blankLen": 2,
    "options": [
     ">=",
     ">"
    ],
    "why": "i=0 对应的元素同样需要乘上它右侧的乘积 R 才算完成，循环必须包含 i=0，因此用 >= 0。",
    "wrongWhy": {
     ">": "循环在 i=0 之前就结束，跳过了对 answer[0] 乘 R 这一步，最终 answer[0] 只有左侧前缀积（恒为 1），结果错误。"
    }
   },
   {
    "id": "p238-suffix-multiply-order",
    "crux": "先用 R 更新 answer[i]，再把 nums[i] 累乘进 R，顺序不能反",
    "answer": "answer[i] = answer[i] * R;",
    "blankOffset": 549,
    "blankLen": 26,
    "options": [
     "answer[i] = answer[i] * R;",
     "R *= nums[i];",
     "answer[i] = answer[i] * nums[i];"
    ],
    "why": "solutionText 强调顺序不能反：乘入答案那一刻 R 必须恰好是 i 右侧（不含 i 自身）的乘积，所以必须先用当前 R 更新 answer[i]，再把 nums[i] 计入 R 供下一轮使用。",
    "wrongWhy": {
     "R *= nums[i];": "如果先把 nums[i] 乘进 R 再用来更新 answer[i]，R 就提前包含了 nums[i] 自身，导致 answer[i] 多乘了一次自己的值。",
     "answer[i] = answer[i] * nums[i];": "错误地把自身值乘入而不是滚动的右侧乘积 R，完全偏离“除自身外”的题意。"
    }
   }
  ]
 },
 {
  "id": 239,
  "title": "239. 滑动窗口最大值",
  "category": "子串",
  "difficulty": "hard",
  "descHtml": "<p>给你一个整数数组 <code>nums</code>，有一个大小为&nbsp;<code>k</code><em>&nbsp;</em>的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 <code>k</code>&nbsp;个数字。滑动窗口每次只向右移动一位。</p>\n\n<p>返回 <em>滑动窗口中的最大值 </em>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<b>输入：</b>nums = [1,3,-1,-3,5,3,6,7], k = 3\n<b>输出：</b>[3,3,5,5,6,7]\n<b>解释：</b>\n滑动窗口的位置                最大值\n---------------               -----\n[1  3  -1] -3  5  3  6  7       <strong>3</strong>\n 1 [3  -1  -3] 5  3  6  7       <strong>3</strong>\n 1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>\n 1  3  -1 [-3  5  3] 6  7       <strong>5</strong>\n 1  3  -1  -3 [5  3  6] 7       <strong>6</strong>\n 1  3  -1  -3  5 [3  6  7]      <strong>7</strong>\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<b>输入：</b>nums = [1], k = 1\n<b>输出：</b>[1]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><b>提示：</b></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>1 &lt;= k &lt;= nums.length</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        int n = nums.size();\n        deque<int> q;\n        for (int i = 0; i < k; ++i) {\n            while (!q.empty() && nums[i] >= nums[q.back()]) { // 弹掉队尾更小的元素，保持队列单调递减\n                q.pop_back();\n            }\n            q.push_back(i);\n        }\n\n        vector<int> ans = {nums[q.front()]};\n        for (int i = k; i < n; ++i) {\n            while (!q.empty() && nums[i] >= nums[q.back()]) {\n                q.pop_back();\n            }\n            q.push_back(i);\n            while (q.front() <= i - k) { // 队首下标已滑出窗口左边界则弹出\n                q.pop_front();\n            }\n            ans.push_back(nums[q.front()]);\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p239-sliding-window-max-deque-back-pop-condition",
    "crux": "新元素入队前，从队尾弹出旧下标的比较条件方向与对象必须是「值 >= 值」，弹的是所有不再可能成为最大值的队尾元素",
    "answer": "nums[i] >= nums[q.back()]",
    "blankOffset": 208,
    "blankLen": 25,
    "options": [
     "nums[i] >= nums[q.back()]",
     "nums[i] <= nums[q.back()]",
     "nums[i] >= q.back()"
    ],
    "why": "题解讲解和提示明确：新元素入队前要「从队尾弹掉所有 nums[q.back()] <= nums[i] 的下标」，等价于 while (nums[i] >= nums[q.back()]) 弹出，这样才能维持队列单调递减、队首始终是当前窗口最大值的下标。",
    "wrongWhy": {
     "nums[i] <= nums[q.back()]": "方向反了：本该弹掉比新元素小（或相等）的队尾元素，反而在新元素较小时去弹队尾较大的元素，破坏单调递减性质。例如 nums=[3,1] 时会把值3的下标错误弹出，导致队首变成值1，最大值算错。",
     "nums[i] >= q.back()": "漏写了 nums[]，把新元素的值直接和队尾的下标数值比较，而不是和队尾下标对应的值比较，比较对象错了，窗口值稍大或下标偏移时弹出/保留的判断完全失真。"
    }
   },
   {
    "id": "p239-sliding-window-max-deque-front-expire-condition",
    "crux": "判断队首下标是否已经滑出窗口左边界时，边界必须用 <= i-k（含等号），且判断的对象必须是队首而非队尾",
    "answer": "q.front() <= i - k",
    "blankOffset": 578,
    "blankLen": 18,
    "options": [
     "q.front() <= i - k",
     "q.front() < i - k",
     "q.back() <= i - k"
    ],
    "why": "题解讲解和提示指出：当前窗口是 [i-k+1, i]，若 q.front() <= i-k，说明队首下标已经不大于窗口左边界的前一个位置，即已经滑出窗口，需要弹出；用了等号才能覆盖『恰好滑出』这一临界情况。",
    "wrongWhy": {
     "q.front() < i - k": "少了等号，当队首下标恰好等于 i-k（正好滑出窗口左边界）时不会被弹出，导致一个已经不在当前窗口范围内的过期下标继续留在队首，可能被误当作当前窗口最大值返回。",
     "q.back() <= i - k": "把该判断队首(front)误写成判断队尾(back)，而队尾恰好总是刚插入的下标 i，i <= i-k 在 k>0 时恒为假，导致这个弹出条件永远不成立，过期下标永远清理不掉，最终会把已经滑出窗口的旧值当成答案返回。"
    }
   }
  ]
 },
 {
  "id": 240,
  "title": "240. 搜索二维矩阵 II",
  "category": "矩阵",
  "difficulty": "medium",
  "descHtml": "<p>编写一个高效的算法来搜索&nbsp;<code><em>m</em>&nbsp;x&nbsp;<em>n</em></code>&nbsp;矩阵 <code>matrix</code> 中的一个目标值 <code>target</code> 。该矩阵具有以下特性：</p>\n\n<ul>\n\t<li>每行的元素从左到右升序排列。</li>\n\t<li>每列的元素从上到下升序排列。</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>示例 1：</b></p>\n\n<pre>\n<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5\n<b>输出：</b>true\n</pre>\n\n<p><b>示例 2：</b></p>\n\n<pre>\n<b>输入：</b>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20\n<b>输出：</b>false\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == matrix.length</code></li>\n\t<li><code>n == matrix[i].length</code></li>\n\t<li><code>1 &lt;= n, m &lt;= 300</code></li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= matrix[i][j] &lt;= 10<sup>9</sup></code></li>\n\t<li>每行的所有元素从左到右升序排列</li>\n\t<li>每列的所有元素从上到下升序排列</li>\n\t<li><code>-10<sup>9</sup>&nbsp;&lt;= target &lt;= 10<sup>9</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int x = 0, y = n - 1; // 从右上角出发：它是本行最大、本列最小\n        while (x < m && y >= 0) {\n            if (matrix[x][y] == target) {\n                return true;\n            }\n            if (matrix[x][y] > target) {\n                --y;\n            }\n            else {\n                ++x;\n            }\n        }\n        return false;\n    }\n};",
  "cards": [
   {
    "id": "p240-start-y-top-right",
    "crux": "起点必须选在右上角 (0, n-1)，这样该位置同时是本行最大值、本列最小值，才能保证每次比较都能唯一排除一整行或一整列",
    "answer": "n - 1",
    "blankOffset": 166,
    "blankLen": 5,
    "options": [
     "n - 1",
     "0",
     "n",
     "m - 1"
    ],
    "why": "右上角 matrix[0][n-1] 是第0行里最大的元素，同时是第n-1列里最小的元素：往左元素变小、往下元素变大，两个方向单调性相反，比较结果才能唯一决定往左还是往下走，从而每步排除一整行或一整列，达到 O(m+n)。",
    "wrongWhy": {
     "0": "y=0 是左上角，matrix[0][0] 是全矩阵最小值，往右和往下都会变大，一次比较无法确定该往哪个方向排除，算法失效。",
     "n": "越界访问 matrix[x][n]，n 是列数，合法下标最大为 n-1，直接导致数组越界崩溃或未定义行为。",
     "m - 1": "把列下标错写成行数相关的值，若 m != n 会越界或起点不在右上角，破坏排除法所需的单调性。"
    }
   },
   {
    "id": "p240-loop-cond-y-ge-zero",
    "crux": "循环终止条件必须是 y >= 0（含 0），若写成 y > 0 会在 y 走到 0 时提前退出，漏掉第 0 列的搜索",
    "answer": "y >= 0",
    "blankOffset": 219,
    "blankLen": 6,
    "options": [
     "y >= 0",
     "y > 0",
     "y <= n",
     "y != 0"
    ],
    "why": "y 的合法下标范围是 [0, n-1]，只要 y 还没有越过左边界（即 y 仍 >= 0）就应该继续比较，写成 y >= 0 才能把 y==0 这一列也纳入搜索；一旦 --y 使 y 变成 -1 才应该退出循环。",
    "wrongWhy": {
     "y > 0": "当 y 收缩到 0 时循环条件为假直接退出，导致 matrix[x][0] 这一整列都没有被比较过，可能漏掉本该找到的 target。",
     "y <= n": "y 从 n-1 开始只减不增，y <= n 恒为真（连 y 变成负数时也成立），根本起不到左边界约束的作用；当 --y 把 y 减成负数后循环仍继续，会访问 matrix[x][-1] 等非法下标导致越界崩溃。",
     "y != 0": "y 递减到 0 时 y != 0 为假，循环提前退出，和 y > 0 犯同样的错误——matrix[x][0] 这一整列从未被比较，可能漏掉 target。"
    }
   },
   {
    "id": "p240-greater-move-left",
    "crux": "当前值比 target 大时，说明整列都比 target 大，应该左移列指针 --y，而不是误写成移动行指针",
    "answer": "--y",
    "blankOffset": 371,
    "blankLen": 3,
    "options": [
     "--y",
     "++y",
     "--x",
     "++x"
    ],
    "why": "matrix[x][y] 是当前行的最大值，若它都比 target 大，说明该列从 matrix[x][y] 往下的所有值也都比 target 大（每列升序），这一整列都可以排除，因此应该左移，即 --y。",
    "wrongWhy": {
     "++y": "y 已经是本行最大值所在列，再右移会越过右边界或指向更大的值，方向与排除逻辑相反，永远无法收敛甚至越界。",
     "--x": "把该排除的列错当成行处理，行指针上移没有依据（题解中行指针只会 ++x 下移），会导致漏掉本该保留的搜索区域，产生错误结果。",
     "++x": "这是「比 target 小」分支该做的操作，用在「比 target 大」这里方向完全搞反，会把本应保留的行错误跳过。"
    }
   }
  ]
 },
 {
  "id": 279,
  "title": "279. 完全平方数",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数 <code>n</code> ，返回 <em>和为 <code>n</code> 的完全平方数的最少数量</em> 。</p>\n\n<p><strong>完全平方数</strong> 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，<code>1</code>、<code>4</code>、<code>9</code> 和 <code>16</code> 都是完全平方数，而 <code>3</code> 和 <code>11</code> 不是。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = <code>12</code>\n<strong>输出：</strong>3 \n<strong>解释：</strong><code>12 = 4 + 4 + 4</code></pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>n = <code>13</code>\n<strong>输出：</strong>2\n<strong>解释：</strong><code>13 = 4 + 9</code></pre>\n&nbsp;\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int numSquares(int n) {\n        vector<int> f(n + 1);\n        for (int i = 1; i <= n; i++) {\n            int minn = INT_MAX;\n            for (int j = 1; j * j <= i; j++) {\n                minn = min(minn, f[i - j * j]);\n            }\n            f[i] = minn + 1; // f[i] = 1 + min(f[i - j*j])，枚举最后一个平方数\n        }\n        return f[n];\n    }\n};",
  "cards": [
   {
    "id": "p279-dp-array-size-n-plus-1",
    "crux": "dp数组大小要开 n+1，才能存下 f[0]..f[n]",
    "answer": "n + 1",
    "blankOffset": 75,
    "blankLen": 5,
    "options": [
     "n + 1",
     "n",
     "n - 1"
    ],
    "why": "f[i] 表示和为 i 的完全平方数最少数量，答案是 f[n]，所以数组要能容纳下标 0 到 n，共 n+1 个位置。",
    "wrongWhy": {
     "n": "数组只有下标 0 到 n-1，访问 f[n] 会越界（未定义行为），最终 return f[n] 读到的是野值。",
     "n - 1": "比 n 还少一个，越界更严重，f[i] 循环内部对较大的 i 就已经越界写。"
    }
   },
   {
    "id": "p279-outer-loop-bound-i-le-n",
    "crux": "外层循环要跑到 i <= n，才能把 f[n] 算出来",
    "answer": "i <= n",
    "blankOffset": 107,
    "blankLen": 6,
    "options": [
     "i <= n",
     "i < n",
     "i <= n - 1"
    ],
    "why": "答案要求的是 f[n]，外层循环必须覆盖到 i = n 这一次迭代，才能把 f[n] 计算并赋值。",
    "wrongWhy": {
     "i < n": "循环在 i = n-1 时结束，f[n] 从未被计算，仍是 vector 默认初始化的 0，return f[n] 返回错误的 0。",
     "i <= n - 1": "等价于 i < n，同样漏算 f[n] 这一项，结果错误。"
    }
   },
   {
    "id": "p279-inner-loop-bound-jj-le-i",
    "crux": "内层枚举平方数要用 j*j <= i（含等号），不能漏掉 j*j 恰好等于 i 的情况",
    "answer": "j * j <= i",
    "blankOffset": 182,
    "blankLen": 10,
    "options": [
     "j * j <= i",
     "j * j < i",
     "j <= i"
    ],
    "why": "枚举“最后一个平方数 j*j”时，j*j 可以恰好等于 i（此时 i 本身就是完全平方数，f[i-j*j]=f[0]=0 直接给出最优解 1），必须用 <= 才能覆盖这种关键情况。",
    "wrongWhy": {
     "j * j < i": "漏掉 j*j == i 的情况，比如 i=4 本可以用一个 2*2 得到 f[4]=1，漏掉后会用更差的组合算出偏大的错误结果。",
     "j <= i": "边界放得太宽，j 会远大于需要的范围，导致 i - j*j 变成负数，f[i - j*j] 数组越界访问。"
    }
   },
   {
    "id": "p279-minn-init-int-max",
    "crux": "minn 必须初始化成 INT_MAX，才能让 min() 正确求出最小值",
    "answer": "INT_MAX",
    "blankOffset": 145,
    "blankLen": 7,
    "options": [
     "INT_MAX",
     "0",
     "-1"
    ],
    "why": "minn 是要在内层循环中不断取更小值的累加器，必须先设成一个足够大的哨兵值，才能保证第一次比较时被真实的 f 值替换。",
    "wrongWhy": {
     "0": "min(0, f[...]) 由于 f 值恒为非负数，结果永远是 0，导致 f[i] = 0 + 1 = 1 对所有 i 都成立，DP 完全失效。",
     "-1": "min(-1, f[...]) 结果永远是 -1，f[i] 恒为 0，结果同样全错，且 -1 也不是有意义的“未确定”状态。"
    }
   },
   {
    "id": "p279-transfer-index-i-minus-jj",
    "crux": "状态转移要查 f[i - j*j]，即减去当前枚举的那个完全平方数",
    "answer": "i - j * j",
    "blankOffset": 236,
    "blankLen": 9,
    "options": [
     "i - j * j",
     "i - j",
     "i / (j * j)"
    ],
    "why": "枚举“最后一个平方数是 j*j”，那么剩下的部分就是 i - j*j，需要查表 f[i - j*j] 来获取剩余部分的最优解，再加 1（即这个 j*j）。",
    "wrongWhy": {
     "i - j": "少减了 (j*j - j)，语义上不对应“减去一个完全平方数”，算出来的 f 值毫无意义，且当 j 较大时 i-j 仍可能非负从而不报错但结果错误。",
     "i / (j * j)": "把减法转移错误地写成除法，完全偏离“背包转移减去当前物品体积”的含义，是彻底理解错了状态转移方程。"
    }
   }
  ]
 },
 {
  "id": 283,
  "title": "283. 移动零",
  "category": "双指针",
  "difficulty": "easy",
  "descHtml": "<p>给定一个数组 <code>nums</code>，编写一个函数将所有 <code>0</code> 移动到数组的末尾，同时保持非零元素的相对顺序。</p>\n\n<p><strong>请注意</strong>&nbsp;，必须在不复制数组的情况下原地对数组进行操作。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[0,1,0,3,12]</code>\n<strong>输出:</strong> <code>[1,3,12,0,0]</code>\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> nums = <code>[0]</code>\n<strong>输出:</strong> <code>[0]</code></pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示</strong>:</p>\n\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-2<sup>31</sup>&nbsp;&lt;= nums[i] &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b>你能尽量减少完成的操作次数吗？</p>",
  "code": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int n = nums.size(), left = 0, right = 0;\n        while (right < n) {\n            if (nums[right]) {\n                swap(nums[left], nums[right]); // 不变量：left 左边全非零且保持原相对顺序\n                left++;\n            }\n            right++;\n        }\n    }\n};",
  "cards": [
   {
    "id": "p283-right-scan-boundary",
    "crux": "while循环边界必须是 right < n，不能等于n（越界）也不能少扫最后一个",
    "answer": "right < n",
    "blankOffset": 131,
    "blankLen": 9,
    "options": [
     "right < n",
     "right <= n",
     "right < n - 1"
    ],
    "why": "nums合法下标范围是[0, n-1]，right<n保证right每次都指向合法元素，扫描到n-1为止后自然停止，是标准的左闭右开区间边界。",
    "wrongWhy": {
     "right <= n": "当right==n时会执行nums[right]，此时下标n越界，访问未定义内存（数组越界）",
     "right < n - 1": "少遍历了下标为n-1的最后一个元素，如果它是非零数就会漏处理，导致结果错误"
    }
   },
   {
    "id": "p283-nonzero-swap-condition",
    "crux": "if判断的方向必须是「nums[right]非零才交换」，写反就是把0往前挪",
    "answer": "nums[right]",
    "blankOffset": 160,
    "blankLen": 11,
    "options": [
     "nums[right]",
     "nums[right] == 0",
     "!nums[right]"
    ],
    "why": "nums[right]作为bool是「right位置的数不为0」的判断，只有非零时才需要把它换到left位置并推进left，这正是维护「left左边全非零」这一不变量的关键。",
    "wrongWhy": {
     "nums[right] == 0": "条件方向反了，变成只在right是0时才交换，结果会把0往前搬、把非零数往后挤，和题目要求完全相反",
     "!nums[right]": "等价于nums[right]==0，同样把交换的触发条件反过来了，导致0被移动到数组前面"
    }
   },
   {
    "id": "p283-right-advance-unconditional",
    "crux": "right++必须在if外层、每轮无条件执行，不能和left++搞混或写反方向",
    "answer": "right++;",
    "blankOffset": 298,
    "blankLen": 8,
    "options": [
     "right++;",
     "left++;",
     "right--;"
    ],
    "why": "right负责逐个扫描每个元素，无论当前元素是否非零都要前进一步，才能保证一次遍历不遗漏；它和只在非零时才前进的left++职责不同，不可互换。",
    "wrongWhy": {
     "left++;": "把外层递增误写成left++，会导致right不再前进（right恒定使while条件永真而死循环），同时left被多余递增，破坏「left左边全非零」的不变量",
     "right--;": "方向写反，指针向左回退，导致重复处理已扫描过的元素甚至死循环，无法完成从左到右的一次遍历"
    }
   }
  ]
 },
 {
  "id": 287,
  "title": "287. 寻找重复数",
  "category": "技巧",
  "difficulty": "medium",
  "descHtml": "<p>给定一个包含&nbsp;<code>n + 1</code> 个整数的数组&nbsp;<code>nums</code> ，其数字都在&nbsp;<code>[1, n]</code>&nbsp;范围内（包括 <code>1</code> 和 <code>n</code>），可知至少存在一个重复的整数。</p>\n\n<p>假设 <code>nums</code> 只有 <strong>一个重复的整数</strong> ，返回&nbsp;<strong>这个重复的数</strong> 。</p>\n\n<p>你设计的解决方案必须 <strong>不修改</strong> 数组 <code>nums</code> 且只用常量级 <code>O(1)</code> 的额外空间。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,3,4,2,2]\n<strong>输出：</strong>2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,1,3,4,2]\n<strong>输出：</strong>3\n</pre>\n\n<p><strong>示例 3 :</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [3,3,3,3,3]\n<strong>输出：</strong>3\n</pre>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>\n\t<li><code>nums.length == n + 1</code></li>\n\t<li><code>1 &lt;= nums[i] &lt;= n</code></li>\n\t<li><code>nums</code> 中 <strong>只有一个整数</strong> 出现 <strong>两次或多次</strong> ，其余整数均只出现 <strong>一次</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b></p>\n\n<ul>\n\t<li>如何证明 <code>nums</code> 中至少存在一个重复的数字?</li>\n\t<li>你可以设计一个线性级时间复杂度 <code>O(n)</code> 的解决方案吗？</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        // 把下标 i -> nums[i] 看作链表的 next 指针，重复数即环的入口\n        int slow = 0, fast = 0;\n        do {\n            slow = nums[slow];\n            fast = nums[nums[fast]]; // 快指针每次走两步\n        } while (slow != fast);\n        slow = 0;\n        while (slow != fast) { // 第二阶段：同速前进，相遇点就是环入口\n            slow = nums[slow];\n            fast = nums[fast];\n        }\n        return slow;\n    }\n};",
  "cards": [
   {
    "id": "p287-floyd-init-both-zero",
    "crux": "两指针初始值都必须是 0（下标起点），不能用 nums[0] 或不同起点",
    "answer": "int slow = 0, fast = 0;",
    "blankOffset": 127,
    "blankLen": 23,
    "options": [
     "int slow = 0, fast = 0;",
     "int slow = nums[0], fast = nums[0];",
     "int slow = 0, fast = nums[0];",
     "int slow = 1, fast = 1;"
    ],
    "why": "把下标 i 看作链表节点、i -> nums[i] 看作 next 指针，'链表头'固定是下标 0 这个虚拟起点（因为数组本身没有专门的头节点，从下标 0 出发遍历即可覆盖整条链路），所以两个指针都必须从下标 0 开始，且必须相同，否则后续判环、找环入口的推导（第二阶段两者走的步数关系）不成立。",
    "wrongWhy": {
     "int slow = nums[0], fast = nums[0];": "把起点误当成 nums[0] 这个'值'而不是下标 0，相当于链表少走了从下标0到nums[0]这一步，导致后续相遇点与环入口的距离关系被打乱，找到的入口可能不是重复数",
     "int slow = 0, fast = nums[0];": "两个指针起点不一致，Floyd 判环第二阶段'相遇点到环入口的距离等于起点到环入口的距离'这一数学结论要求两指针初始都在同一起点，否则找到的入口错误",
     "int slow = 1, fast = 1;": "把下标起点误写成 1，虽然值域是 1..n，但下标体系仍从 0 开始，从 1 出发会漏掉下标 0 这个节点，可能得到错误的环入口"
    }
   },
   {
    "id": "p287-floyd-do-while-first-move",
    "crux": "第一阶段必须用 do-while（先走一步再判断），不能用 while 先判断",
    "answer": "do {",
    "blankOffset": 159,
    "blankLen": 4,
    "options": [
     "do {",
     "while (slow != fast) {",
     "for (;;) {",
     "if (slow != fast) {"
    ],
    "why": "初始时 slow 和 fast 都等于 0，是相等的；如果用 while(slow != fast) 先判断再执行，循环体一次都不会执行就直接退出，判环逻辑完全失效。必须用 do-while，保证先走一步产生位移，再检查是否相遇。",
    "wrongWhy": {
     "while (slow != fast) {": "初始 slow==fast==0，条件一开始就为假，循环体一次也不执行，直接跳过第一阶段，slow 和 fast 都停留在 0，无法找到相遇点",
     "for (;;) {": "虽然是无限循环能进入循环体，但退出条件需要另外补写在循环体末尾且逻辑上等价于 do-while，直接用 for(;;) 而不配合等价的退出判断会导致结构和原意图不符，容易漏写或错写终止条件",
     "if (slow != fast) {": "if 只判断/执行一次，不会反复推进指针直到相遇，无法实现循环找环的效果"
    }
   },
   {
    "id": "p287-floyd-fast-double-step",
    "crux": "快指针必须是两层嵌套 nums[nums[fast]]，模拟一次走两步",
    "answer": "fast = nums[nums[fast]];",
    "blankOffset": 207,
    "blankLen": 24,
    "options": [
     "fast = nums[nums[fast]];",
     "fast = nums[fast] * 2;",
     "fast = nums[fast];",
     "fast = nums[nums[fast]] % nums.size();"
    ],
    "why": "链表中快指针每次走两步，翻译成'下标 -> nums[下标]'的跳转关系就是连续跳两次，即先算 nums[fast] 得到走一步后的位置，再对这个结果取 nums[...] 得到走两步后的位置，写成 nums[nums[fast]]。",
    "wrongWhy": {
     "fast = nums[fast] * 2;": "把'走两步'误解成数值乘以2，但链表节点的跳转是通过 nums[] 数组取值实现的，不是简单的数值翻倍，这样算出来的下标毫无意义甚至会越界",
     "fast = nums[fast];": "只跳了一次，等同于慢指针的走法，快慢指针步速相同，永远不会在环内产生相对位移，无法判断成环，甚至可能永远不相遇（判环失败）",
     "fast = nums[nums[fast]] % nums.size();": "多余地对结果取模，nums[nums[fast]] 本身的值域已经保证落在合法下标范围内（值域 1..n 对应下标 0..n），额外取模会人为篡改跳转目标，破坏链表结构"
    }
   },
   {
    "id": "p287-floyd-phase2-reset-slow",
    "crux": "第二阶段开始前必须把 slow 重置为 0，fast 保持相遇点不变",
    "answer": "slow = 0;",
    "blankOffset": 284,
    "blankLen": 9,
    "options": [
     "slow = 0;",
     "fast = 0;",
     "slow = fast;",
     "// 不重置，直接进入第二阶段"
    ],
    "why": "Floyd 算法的数学结论是：把 slow 放回起点 0，fast 留在第一阶段的相遇点，两者同速前进，再次相遇的位置就是环的入口（即重复数）。这一步的关键是重置 slow 而不是 fast，因为要保留 fast 已经到达的相遇点信息。",
    "wrongWhy": {
     "fast = 0;": "重置的应该是 slow 而不是 fast，把 fast 也归零会丢失第一阶段相遇点的信息，两指针又从同一起点同速出发，永远重合，无法定位环入口",
     "slow = fast;": "把 slow 也设为相遇点而不是起点 0，两者从同一点同速前进会一直相等，循环条件 slow != fast 直接为假，第二阶段直接跳过，返回错误的相遇点而非真正的环入口",
     "// 不重置，直接进入第二阶段": "slow 仍停留在第一阶段结束时的位置（相遇点），不是从起点 0 出发，破坏了'起点到入口的距离等于相遇点到入口的距离'这一数学前提，找到的位置不是环入口"
    }
   },
   {
    "id": "p287-floyd-phase2-same-speed",
    "crux": "第二阶段两指针都必须单步前进（同速），不能保留快指针原来的两步跳法",
    "answer": "fast = nums[fast];",
    "blankOffset": 390,
    "blankLen": 18,
    "options": [
     "fast = nums[fast];",
     "fast = nums[nums[fast]];",
     "fast = fast;",
     "fast = nums[slow];"
    ],
    "why": "第二阶段的数学证明要求两指针以相同速度（各走一步）前进，才能保证在环入口处精确相遇；如果 fast 仍按第一阶段的两步跳法前进，两者步速不同，得到的相遇点就不再是环入口。",
    "wrongWhy": {
     "fast = nums[nums[fast]];": "沿用第一阶段的两步跳法，导致第二阶段 fast 仍比 slow 快一倍，'相遇点到环入口的距离等于起点到环入口距离'这一等量关系被破坏，找到的相遇点不再是环入口",
     "fast = fast;": "fast 原地不动，只有 slow 在移动，两者相遇的位置只是 slow 绕环一圈追上静止的 fast，与真正的环入口无关",
     "fast = nums[slow];": "错误地用刚更新的 slow 来计算 fast 的下一步，导致两指针实际耦合成同一条轨迹的不同时刻，破坏了两个独立指针同速前进相遇于入口的证明前提"
    }
   }
  ]
 },
 {
  "id": 295,
  "title": "295. 数据流的中位数",
  "category": "堆",
  "difficulty": "hard",
  "descHtml": "<p><strong>中位数</strong>是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。</p>\n\n<ul>\n\t<li>例如 <code>arr = [2,3,4]</code>&nbsp;的中位数是 <code>3</code>&nbsp;。</li>\n\t<li>例如&nbsp;<code>arr = [2,3]</code> 的中位数是 <code>(2 + 3) / 2 = 2.5</code> 。</li>\n</ul>\n\n<p>实现 MedianFinder 类:</p>\n\n<ul>\n\t<li>\n\t<p><code>MedianFinder()</code> 初始化 <code>MedianFinder</code>&nbsp;对象。</p>\n\t</li>\n\t<li>\n\t<p><code>void addNum(int num)</code> 将数据流中的整数 <code>num</code> 添加到数据结构中。</p>\n\t</li>\n\t<li>\n\t<p><code>double findMedian()</code> 返回到目前为止所有元素的中位数。与实际答案相差&nbsp;<code>10<sup>-5</sup></code>&nbsp;以内的答案将被接受。</p>\n\t</li>\n</ul>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入</strong>\n[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]\n<strong>输出</strong>\n[null, null, null, 1.5, null, 2.0]\n\n<strong>解释</strong>\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0</pre>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>-10<sup>5</sup>&nbsp;&lt;= num &lt;= 10<sup>5</sup></code></li>\n\t<li>在调用 <code>findMedian</code>&nbsp;之前，数据结构中至少有一个元素</li>\n\t<li>最多&nbsp;<code>5 * 10<sup>4</sup></code>&nbsp;次调用&nbsp;<code>addNum</code>&nbsp;和&nbsp;<code>findMedian</code></li>\n</ul>",
  "code": "class MedianFinder {\npublic:\n    priority_queue<int, vector<int>, less<int>> queMin;    // 大顶堆：存较小的一半，堆顶是这半的最大值\n    priority_queue<int, vector<int>, greater<int>> queMax; // 小顶堆：存较大的一半，个数等于 queMin 或少 1\n\n    MedianFinder() {}\n\n    void addNum(int num) {\n        if (queMin.empty() || num <= queMin.top()) {\n            queMin.push(num);\n            if (queMax.size() + 1 < queMin.size()) {\n                queMax.push(queMin.top());\n                queMin.pop();\n            }\n        } else {\n            queMax.push(num);\n            if (queMax.size() > queMin.size()) {\n                queMin.push(queMax.top());\n                queMax.pop();\n            }\n        }\n    }\n\n    double findMedian() {\n        if (queMin.size() > queMax.size()) {\n            return queMin.top();\n        }\n        return (queMin.top() + queMax.top()) / 2.0;\n    }\n};",
  "cards": [
   {
    "id": "p295-addnum-empty-check-order",
    "crux": "addNum 条件判断中，queMin.empty() 必须写在 || 左边，靠短路先挡住空堆",
    "answer": "queMin.empty() || num <= queMin.top()",
    "blankOffset": 265,
    "blankLen": 37,
    "options": [
     "queMin.empty() || num <= queMin.top()",
     "num <= queMin.top() || queMin.empty()",
     "queMin.empty() && num <= queMin.top()",
     "num <= queMin.top()"
    ],
    "why": "C++ 的 || 从左到右求值，只有左操作数为 false 时才会去求值右操作数。第一次调用 addNum 时 queMin 为空，必须先判断 queMin.empty() 为 true 从而短路跳过 num <= queMin.top()，否则对空的 priority_queue 调用 top() 是未定义行为。",
    "wrongWhy": {
     "num <= queMin.top() || queMin.empty()": "顺序颠倒后左操作数变成 num <= queMin.top()，第一次插入时 queMin 为空却仍会先执行 queMin.top()，属于未定义行为，实际运行往往崩溃或读到脏数据。",
     "queMin.empty() && num <= queMin.top()": "把 || 错写成 &&：队列为空时（左操作数为 true）仍会去求值 num <= queMin.top()，同样对空堆调用 top() 未定义行为；一旦队列非空，&& 的短路会让整个条件恒为 false，之后所有数字都被分到 else 分支，大顶堆再也进不去新元素。",
     "num <= queMin.top()": "漏掉了 queMin.empty() 的短路保护，第一次调用 addNum 时 queMin 为空，直接对空的 priority_queue 调用 top() 是未定义行为，程序往往当场崩溃。"
    }
   },
   {
    "id": "p295-quemin-rebalance-threshold",
    "crux": "queMin 超出不变量的判断必须是严格 < （差值≥2才搬），不能用 <=",
    "answer": "queMax.size() + 1 < queMin.size()",
    "blankOffset": 352,
    "blankLen": 33,
    "options": [
     "queMax.size() + 1 < queMin.size()",
     "queMax.size() + 1 <= queMin.size()",
     "queMax.size() < queMin.size()",
     "queMax.size() + 2 < queMin.size()"
    ],
    "why": "不变量要求 queMin（大顶堆）个数最多比 queMax 多 1；只有当两堆差值达到 2（即 queMax.size()+1 < queMin.size()）时才需要把多出的一个挪去 queMax，用严格 < 才能让差值收敛回 0 或 1。",
    "wrongWhy": {
     "queMax.size() + 1 <= queMin.size()": "例如首次插入 1：queMin 为空所以先 push 到 queMin，此时 queMax.size()+1<=queMin.size() 即 0+1<=1 成立，会立刻把刚插入的元素搬去 queMax，导致 queMin 变空、queMax 有一个元素，直接破坏『queMin 个数≥queMax』的不变量。",
     "queMax.size() < queMin.size()": "少了 +1，等价于差值≥1 就触发搬移；首次插入 1 后 queMin=[1]、queMax=[] 就会满足 0<1 而把元素搬空 queMin，元素总数为奇数时无法把多出的那一个稳定留在 queMin 里，findMedian 甚至会对空的 queMin 调用 top()。",
     "queMax.size() + 2 < queMin.size()": "阈值放宽到差值≥3才搬，使 queMin 可以比 queMax 多 2 甚至更多；例如依次插入 4、3、2、1 后 queMin 会比 queMax 多 2，findMedian 走到『queMin 更多』分支返回 3，而 {1,2,3,4} 正确中位数应为 2.5，结果错误。"
    }
   },
   {
    "id": "p295-quemax-rebalance-threshold",
    "crux": "queMax 超出不变量的判断用严格 >，不能松成 >= 或放宽阈值",
    "answer": "queMax.size() > queMin.size()",
    "blankOffset": 539,
    "blankLen": 29,
    "options": [
     "queMax.size() > queMin.size()",
     "queMax.size() >= queMin.size()",
     "queMax.size() > queMin.size() + 1",
     "queMax.size() + 1 > queMin.size()"
    ],
    "why": "不变量要求 queMin 个数 ≥ queMax 个数，只要 push 后 queMax 严格反超（> ）就要立刻把其堆顶挪回 queMin；用严格大于才能保证两堆刚好相等时不做多余搬移。",
    "wrongWhy": {
     "queMax.size() >= queMin.size()": "依次插入 1、2：插入1后 queMin=[1]；插入2时进入 else 分支 queMax=[2]，此时两堆各1个，用 >= 会判定 1>=1 成立而把2搬回 queMin，得到 queMin=[1,2]、queMax=[]，两堆差值达到2，findMedian 会误判『queMin 更多』直接返回堆顶2，但 {1,2} 真正的中位数是1.5，结果错误。",
     "queMax.size() > queMin.size() + 1": "依次插入 1、2、3 后，正确做法应把 queMax 多出的那个搬回 queMin 得到 queMin=[1,2]、queMax=[3]；但阈值放宽为『多2个才搬』时不会触发搬移，最终 queMin=[1]、queMax=[2,3]，findMedian 走到平均分支算出 (1+2)/2=1.5，而 {1,2,3} 正确中位数应为2，结果错误。",
     "queMax.size() + 1 > queMin.size()": "与 queMax.size() >= queMin.size() 等价（两边同减1即得），同样会在两堆大小相等时也触发不必要的搬移，重演上面 1、2 的错误场景。"
    }
   },
   {
    "id": "p295-findmedian-average-divide-2-point-0",
    "crux": "两堆顶取平均时必须除以 2.0（浮点），不能除以整型 2",
    "answer": "2.0",
    "blankOffset": 837,
    "blankLen": 3,
    "options": [
     "2.0",
     "2",
     "queMin.size()",
     "1.0"
    ],
    "why": "queMin.top() 和 queMax.top() 都是 int，二者之和仍是 int；若除以整型常量会触发整数除法，向下截断小数部分，必须显式除以浮点数 2.0 才能得到正确的小数中位数。",
    "wrongWhy": {
     "2": "int 之和除以 int 常量 2 会做整数除法，直接丢弃小数部分，例如数据流是 {1,2} 时正确中位数应为 1.5，但会被截断算成 1。",
     "queMin.size()": "除数被写成了堆的大小而非常量2，语义完全错误，两数之和除以一个和『2』无关的动态值，得到的根本不是平均值。",
     "1.0": "除数写错为1.0，相当于没有取平均，直接得到两堆顶之和，数值远偏离真正的中位数。"
    }
   }
  ]
 },
 {
  "id": 300,
  "title": "300. 最长递增子序列",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> ，找到其中最长严格递增子序列的长度。</p>\n\n<p><strong>子序列&nbsp;</strong>是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，<code>[3,6,2,7]</code> 是数组 <code>[0,3,1,6,2,2,7]</code> 的<span data-keyword=\"subsequence-array\">子序列</span>。</p>\n&nbsp;\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [10,9,2,5,3,7,101,18]\n<strong>输出：</strong>4\n<strong>解释：</strong>最长递增子序列是 [2,3,7,101]，因此长度为 4 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [0,1,0,3,2,3]\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [7,7,7,7,7,7,7]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2500</code></li>\n\t<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><b>进阶：</b></p>\n\n<ul>\n\t<li>你能将算法的时间复杂度降低到&nbsp;<code>O(n log(n))</code> 吗?</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        int len = 1, n = (int)nums.size();\n        if (n == 0) {\n            return 0;\n        }\n        vector<int> d(n + 1, 0);\n        d[len] = nums[0];\n        for (int i = 1; i < n; ++i) {\n            if (nums[i] > d[len]) {\n                d[++len] = nums[i]; // 比 d 末尾大：直接延长\n            } else {\n                int l = 1, r = len, pos = 0; // 如果找不到说明所有的数都比 nums[i] 大，此时要更新 d[1]，所以这里将 pos 设为 0\n                while (l <= r) {\n                    int mid = (l + r) >> 1;\n                    if (d[mid] < nums[i]) {\n                        pos = mid;\n                        l = mid + 1;\n                    } else {\n                        r = mid - 1;\n                    }\n                }\n                d[pos + 1] = nums[i]; // 替换第一个 >= nums[i] 的位置，让末尾尽量小\n            }\n        }\n        return len;\n    }\n};",
  "cards": [
   {
    "id": "p300-binary-search-loop-bound-le",
    "crux": "二分查找的循环条件用 <= 而不是 <，闭区间 [l, r] 需要在 l==r 时仍检查该位置",
    "answer": "l <= r",
    "blankOffset": 490,
    "blankLen": 6,
    "options": [
     "l <= r",
     "l < r",
     "l <= r - 1"
    ],
    "why": "l、r 构成的是闭区间 [l, r]，当 l==r 时区间里还剩一个元素没有被比较过，必须继续进入循环判断，所以条件要写成 l <= r，直到 l 越过 r 才停止。",
    "wrongWhy": {
     "l < r": "当 l==r 时循环会提前退出，最后一个候选下标 mid 永远得不到判断，pos 可能少更新一次，导致替换位置计算错误。",
     "l <= r - 1": "等价于 l < r，同样会漏掉 l==r 时的那次比较，效果和写错 < 一样。"
    }
   },
   {
    "id": "p300-binary-search-strict-less-condition",
    "crux": "二分收缩条件必须是 d[mid] < nums[i]（严格小于），用于定位第一个 >= nums[i] 的位置",
    "answer": "d[mid] < nums[i]",
    "blankOffset": 568,
    "blankLen": 16,
    "options": [
     "d[mid] < nums[i]",
     "d[mid] <= nums[i]",
     "d[mid] > nums[i]"
    ],
    "why": "题解要求二分找到 d 中第一个不小于 nums[i] 的位置去替换，好让该长度的末尾值尽量小；所以只有当 d[mid] 严格小于 nums[i] 时才说明 mid 位置太小、需要把左边界右移，等于的情况必须归到右半区（收缩 r），条件必须写成严格小于。",
    "wrongWhy": {
     "d[mid] <= nums[i]": "会把 d[mid]==nums[i] 的情况也当作“太小”处理继续右移，pos 会多算 1，最终替换到 nums[i] 右边一个位置，破坏 d 数组的严格递增和最小末尾语义。",
     "d[mid] > nums[i]": "收缩方向完全反了，l 和 r 会朝错误方向移动，二分查找逻辑失效，得不到正确的插入位置。"
    }
   },
   {
    "id": "p300-lis-extend-pre-increment-len",
    "crux": "延长子序列时必须先自增 len 再写入，用前置自增 ++len 而不是后置 len++",
    "answer": "++len",
    "blankOffset": 314,
    "blankLen": 5,
    "options": [
     "++len",
     "len++",
     "len + 1"
    ],
    "why": "延长意味着长度加一，所以要先把 len 自增为新的长度，再用这个新长度作为下标把 nums[i] 写到 d 中对应位置；前置自增 ++len 正好先加后用，保证下标和新长度一致。",
    "wrongWhy": {
     "len++": "后置自增表达式的值是自增前的旧 len，写入位置仍是旧的 d[len]，相当于覆盖了原来的末尾值而没有把新元素放到真正的新长度位置，d 数组的定义被破坏。",
     "len + 1": "只是算出了 len+1 这个下标值用来写入，但变量 len 本身并没有真正自增，后续循环里 len 仍停留在旧值，长度统计和数组含义都会错乱。"
    }
   },
   {
    "id": "p300-lis-replace-position-pos-plus-one",
    "crux": "替换位置必须是 pos + 1，因为 pos 记录的是最后一个严格小于 nums[i] 的下标",
    "answer": "pos + 1",
    "blankOffset": 784,
    "blankLen": 7,
    "options": [
     "pos + 1",
     "pos",
     "pos - 1"
    ],
    "why": "二分过程中 pos 始终记录“最后一个使 d[mid] < nums[i] 成立的下标”（找不到时为 0），那么第一个不小于 nums[i] 的位置自然就是 pos + 1，在这里替换才能让该长度对应的末尾值变得更小同时保持 d 严格递增。",
    "wrongWhy": {
     "pos": "pos 位置本身满足 d[pos] < nums[i]，直接替换会把这个更小的、本该保留的元素覆盖掉，破坏 d 数组递增关系和之前已确定的最小末尾值。",
     "pos - 1": "替换位置往前多退了一格，脱离了二分查找出的正确插入点，可能覆盖到不相关长度对应的末尾值，逻辑上完全错误。"
    }
   },
   {
    "id": "p300-lis-init-first-length-with-nums0",
    "crux": "初始化长度为 1 的最小末尾时要用 nums[0]（0-indexed 的首元素），而不是别的下标或占位值",
    "answer": "nums[0]",
    "blankOffset": 213,
    "blankLen": 7,
    "options": [
     "nums[0]",
     "nums[1]",
     "0"
    ],
    "why": "d 数组是按长度（1-indexed）存最小末尾值的，len 初始为 1，表示只用了一个元素组成的子序列，这个元素当然就是 nums 里下标 0 的那个数，所以要写 nums[0]。",
    "wrongWhy": {
     "0": "把 d[1] 初始化成占位值 0 而不是实际的首元素值，破坏了“d[len] 是长度为 len 的最小末尾值”这一定义，后续所有的比较和二分基准都建立在错误的初始值上。",
     "nums[1]": "会跳过 nums 的第一个元素直接用第二个初始化，导致遗漏了首元素信息，后续遍历也是从 i=1 开始，首元素彻底没有参与计算。"
    }
   }
  ]
 },
 {
  "id": 322,
  "title": "322. 零钱兑换",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>coins</code> ，表示不同面额的硬币；以及一个整数 <code>amount</code> ，表示总金额。</p>\n\n<p>计算并返回可以凑成总金额所需的 <strong>最少的硬币个数</strong> 。如果没有任何一种硬币组合能组成总金额，返回&nbsp;<code>-1</code> 。</p>\n\n<p>你可以认为每种硬币的数量是无限的。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = <code>[1, 2, 5]</code>, amount = <code>11</code>\n<strong>输出：</strong><code>3</code> \n<strong>解释：</strong>11 = 5 + 5 + 1</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = <code>[2]</code>, amount = <code>3</code>\n<strong>输出：</strong>-1</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>coins = [1], amount = 0\n<strong>输出：</strong>0\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= coins.length &lt;= 12</code></li>\n\t<li><code>1 &lt;= coins[i] &lt;= 2<sup>31</sup> - 1</code></li>\n\t<li><code>0 &lt;= amount &lt;= 10<sup>4</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        int Max = amount + 1;\n        vector<int> dp(amount + 1, Max); // 初值 amount+1 表示暂不可达\n        dp[0] = 0;\n        for (int i = 1; i <= amount; ++i) {\n            for (int j = 0; j < (int)coins.size(); ++j) {\n                if (coins[j] <= i) {\n                    dp[i] = min(dp[i], dp[i - coins[j]] + 1); // 枚举最后一枚硬币，取最少数量\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};",
  "cards": [
   {
    "id": "p322-dp-base-case-zero",
    "crux": "dp[0] 必须设为 0，作为递推的正确起点",
    "answer": "0",
    "blankOffset": 187,
    "blankLen": 1,
    "options": [
     "0",
     "1",
     "Max",
     "amount"
    ],
    "why": "hints 指出 dp[i] 表示凑出金额 i 所需的最少硬币数；凑出金额 0 显然不需要任何硬币，所以 dp[0]=0 是唯一正确的边界值，后续所有 dp[i] = dp[i-coins[j]]+1 的递推都依赖这个起点才能算出正确的 +1 累加。",
    "wrongWhy": {
     "1": "会让所有由 dp[0] 派生出的转移都多算 1 枚硬币，比如恰好用一枚面值等于 i 的硬币时结果会被错误算成 2 而不是 1",
     "Max": "把起点也当成『不可达』，会导致任何依赖 dp[0] 的转移都拿到一个巨大的初值，使原本可达的金额被错误判定为不可达或结果异常偏大",
     "amount": "把 dp[0] 设成 amount 这个无意义的大值，同样会污染所有从 0 开始的递推链，让最终结果严重偏大甚至恒为不可达"
    }
   },
   {
    "id": "p322-outer-loop-upper-bound",
    "crux": "外层金额循环要遍历到 i == amount（含），用 <= 而非 <",
    "answer": "<=",
    "blankOffset": 216,
    "blankLen": 2,
    "options": [
     "<=",
     "<",
     ">=",
     ">"
    ],
    "why": "solutionText 说最终要看 dp[amount]，所以外层循环必须把 i=amount 这一格也计算到；用 <= amount 才能保证 dp[amount] 被真正递推填充，而不是停留在初始的『不可达』大值上。",
    "wrongWhy": {
     "<": "循环会在 i=amount-1 时停止，dp[amount] 永远不会被计算，只保留初始值 Max，导致最后 dp[amount] > amount 恒成立，任何金额都会被误判为无法凑出",
     ">=": "循环条件从一开始就不成立（1>=amount 除非 amount<=1），使整个动态规划体基本不执行，dp 数组几乎全是初值",
     ">": "同样从一开始就不满足条件（除非 amount 为负），循环体几乎不会执行，无法得到正确的 dp 值"
    }
   },
   {
    "id": "p322-coin-value-guard",
    "crux": "硬币面值判断要用 <=，允许硬币面值恰好等于当前金额 i 的情况",
    "answer": "<=",
    "blankOffset": 321,
    "blankLen": 2,
    "options": [
     "<=",
     "<",
     "==",
     ">="
    ],
    "why": "hints 里转移公式要求枚举硬币 c 满足 c<=i，这样当 c 恰好等于 i 时能取到 dp[i-c]=dp[0]=0，正确得到『用一枚该硬币就能凑出 i』这一合法解；等号是必要的边界。",
    "wrongWhy": {
     "<": "会漏掉硬币面值恰好等于当前金额的情况（如 i=5、存在面值5的硬币），导致这种本可一枚硬币解决的金额算不到最优解，结果偏大",
     "==": "只允许面值恰好等于 i 的硬币参与转移，面值更小的硬币组合完全被忽略，绝大多数金额都无法正确递推，dp 值会严重偏大甚至保持不可达",
     ">=": "条件反了，只对面值大于等于当前金额的硬币做转移，等价于几乎不会执行 dp[i-coins[j]]（因为该索引会越界或逻辑颠倒），完全破坏递推"
    }
   },
   {
    "id": "p322-transition-formula",
    "crux": "转移方程要用 dp[i - coins[j]] + 1，表示用掉一枚硬币后剩余金额的最优解加一",
    "answer": "dp[i - coins[j]] + 1",
    "blankOffset": 368,
    "blankLen": 20,
    "options": [
     "dp[i - coins[j]] + 1",
     "dp[i] + coins[j]",
     "dp[i - coins[j]]",
     "dp[i - 1] + coins[j]"
    ],
    "why": "solutionText 明确转移是『枚举最后一枚硬币 c：dp[i]=min(dp[i], dp[i-c]+1)』——先扣除这枚硬币面值得到剩余金额的最优解 dp[i-c]，再加上这枚硬币本身计数 +1，才是凑出金额 i 的一种候选方案。",
    "wrongWhy": {
     "dp[i] + coins[j]": "语义完全错误，用当前金额自身的 dp 值加硬币面值，既没有『减去硬币面值』的完全背包递推关系，也把硬币数量单位和金额单位混用，结果毫无意义",
     "dp[i - coins[j]]": "漏掉了 +1，没有把当前这枚硬币计入硬币数量，导致最终统计出的硬币数比实际少一枚",
     "dp[i - 1] + coins[j]": "下标错误地固定减 1 而不是减硬币面值，且把硬币面值当成硬币数量累加，完全偏离『按硬币面值收缩子问题』的完全背包逻辑"
    }
   },
   {
    "id": "p322-unreachable-check-comparator",
    "crux": "最终判断要用 dp[amount] > amount，因为可达时的真实值不会超过 amount，只有仍是初始哨兵值时才会大于 amount",
    "answer": ">",
    "blankOffset": 477,
    "blankLen": 1,
    "options": [
     ">",
     ">=",
     "==",
     "<"
    ],
    "why": "hints 指出『dp[amount] 若仍大于 amount 就返回 -1』：因为凑出 amount 最多用 amount 枚面值1的硬币，任何可达情况的 dp 值都 <= amount；只有保留初始哨兵值 amount+1 时才会 > amount，所以严格大于是区分可达与不可达的正确边界。",
    "wrongWhy": {
     ">=": "会把 dp[amount] 恰好等于 amount 的合法解（比如全用面值1凑出）误判为不可达，错误返回 -1",
     "==": "只有 dp[amount] 恰好等于 amount 时才判不可达，既会漏掉真正的不可达情况（初值是 amount+1，不等于 amount），又会误伤等于 amount 的合法解",
     "<": "逻辑完全反了，会把所有真正可达的情况判定为不可达返回 -1，而把不可达的情况当作合法解返回，结果完全错误"
    }
   }
  ]
 },
 {
  "id": 347,
  "title": "347. 前 K 个高频元素",
  "category": "堆",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回其中出现频率前 <code>k</code> 高的元素。你可以按 <strong>任意顺序</strong> 返回答案。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1,1,1,2,2,3], k = 2</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1], k = 1</span></p>\n\n<p><span class=\"example-io\"><b>输出：</b>[1]</span></p>\n</div>\n\n<p><strong class=\"example\">示例 3：</strong></p>\n\n<div class=\"example-block\">\n<p><span class=\"example-io\"><b>输入：</b>nums = [1,2,1,2,1,2,3,1,3,2], k = 2</span></p>\n\n<p><strong>输出：</strong><span class=\"example-io\">[1,2]</span></p>\n</div>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>-10<sup>4</sup>&nbsp;&lt;= nums[i] &lt;= 10<sup>4</sup></code></li>\n\t<li><code>k</code> 的取值范围是 <code>[1, 数组中不相同的元素的个数]</code></li>\n\t<li>题目数据保证答案唯一，换句话说，数组中前 <code>k</code> 个高频元素的集合是唯一的</li>\n</ul>\n\n<p>&nbsp;</p>\n\n<p><strong>进阶：</strong>你所设计算法的时间复杂度 <strong>必须</strong> 优于 <code>O(n log n)</code> ，其中 <code>n</code><em>&nbsp;</em>是数组大小。</p>",
  "code": "class Solution {\npublic:\n    static bool cmp(pair<int, int>& m, pair<int, int>& n) {\n        return m.second > n.second; // 按出现次数比较，构成小顶堆\n    }\n\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> occurrences;\n        for (auto& v : nums) {\n            occurrences[v]++;\n        }\n\n        // pair 的第一个元素代表数组的值，第二个元素代表了该值出现的次数\n        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(&cmp)> q(cmp);\n        for (auto& [num, count] : occurrences) {\n            if (q.size() == k) {\n                if (q.top().second < count) { // 堆顶是 k 个候选里频率最小的，被更高频的替换\n                    q.pop();\n                    q.emplace(num, count);\n                }\n            } else {\n                q.emplace(num, count);\n            }\n        }\n        vector<int> ret;\n        while (!q.empty()) {\n            ret.emplace_back(q.top().first);\n            q.pop();\n        }\n        return ret;\n    }\n};",
  "cards": [
   {
    "id": "p347-topk-cmp-direction-min-heap",
    "crux": "比较函数 m.second 与 n.second 的方向决定了这是小顶堆还是大顶堆",
    "answer": ">",
    "blankOffset": 109,
    "blankLen": 1,
    "options": [
     ">",
     "<",
     ">=",
     "<="
    ],
    "why": "priority_queue 里比较函数返回 true 表示第一个参数“优先级更低”（排到后面），用 m.second > n.second 意味着次数大的元素被判定为“更靠后”，于是次数小的排在堆顶，构成小顶堆，堆顶始终是当前 k 个候选里频率最小的，方便被更高频的元素淘汰。",
    "wrongWhy": {
     "<": "会反转成大顶堆，堆顶变成频率最大的元素；之后‘堆满且当前频率更大就替换堆顶’的逻辑全部方向颠倒，最终得到的会是频率最小的 k 个，而不是最大的 k 个。",
     ">=": "在相等元素上返回 true 与自身比较矛盾（不满足严格弱序 strict weak ordering 的反自反性要求），STL 堆结构可能出现未定义行为或排序错乱。",
     "<=": "同样违反严格弱序要求，且方向与正确答案相反，会导致堆变成大顶堆并可能因非法比较关系造成堆结构损坏。"
    }
   },
   {
    "id": "p347-topk-heap-full-check-equal-k",
    "crux": "用 q.size() == k 判断堆是否已满，决定走替换分支还是直接入堆分支",
    "answer": "==",
    "blankOffset": 525,
    "blankLen": 2,
    "options": [
     "==",
     ">",
     "<"
    ],
    "why": "堆的大小是被这段逻辑本身维护的不变量：堆满之后每次都是先 pop 再 emplace，大小不会超过 k，所以只要判断 size 是否恰好等于 k 就能准确区分“未满，直接放入”和“已满，需要比较替换”两种情况。",
    "wrongWhy": {
     ">": "由于堆大小永远不会超过 k，这个条件永远为 false，堆满之后的替换分支再也不会执行，反而每次都走 else 直接 emplace，堆会无限增长超过 k 个元素，最终返回的结果个数错误。",
     "<": "方向完全反了：堆还没满（size < k）时就去比较堆顶做替换判断，而不是直接放入；等到堆刚好满（size == k）时又会走 else 直接 push，导致堆超过 k 个元素且未满时该做的替换逻辑被跳过。"
    }
   },
   {
    "id": "p347-topk-replace-condition-direction",
    "crux": "堆满时比较 q.top().second 与 count 的方向，决定是否用更高频的元素替换堆顶",
    "answer": "<",
    "blankOffset": 568,
    "blankLen": 1,
    "options": [
     "<",
     ">",
     ">="
    ],
    "why": "堆顶是当前 k 个候选里频率最小的元素，只有当新遍历到的 count 严格大于堆顶频率（即堆顶 < count）时，才应该弹出堆顶换入这个更高频的元素，从而保证堆里始终保留的是目前见过的频率最高的 k 个。",
    "wrongWhy": {
     ">": "方向反了：变成只有当堆顶频率比 count 还大时才替换，这会把频率更高的候选换出、留下频率更低的，最终堆里保留的是较低频率的 k 个元素，结果完全错误。",
     ">=": "同样是方向反了（且加上相等也替换），效果与 > 类似，依然会错误地把频率更高的候选换出堆，导致结果不是真正的前 k 高频元素。"
    }
   }
  ]
 },
 {
  "id": 394,
  "title": "394. 字符串解码",
  "category": "栈",
  "difficulty": "medium",
  "descHtml": "<p>给定一个经过编码的字符串，返回它解码后的字符串。</p>\n\n<p>编码规则为: <code>k[encoded_string]</code>，表示其中方括号内部的 <code>encoded_string</code> 正好重复 <code>k</code> 次。注意 <code>k</code> 保证为正整数。</p>\n\n<p>你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。</p>\n\n<p>此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 <code>k</code> ，例如不会出现像&nbsp;<code>3a</code>&nbsp;或&nbsp;<code>2[4]</code>&nbsp;的输入。</p>\n\n<p>测试用例保证输出的长度不会超过&nbsp;<code>10<sup>5</sup></code>。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"3[a]2[bc]\"\n<strong>输出：</strong>\"aaabcbc\"\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"3[a2[c]]\"\n<strong>输出：</strong>\"accaccacc\"\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"2[abc]3[cd]ef\"\n<strong>输出：</strong>\"abcabccdcdcdef\"\n</pre>\n\n<p><strong>示例 4：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"abc3[cd]xyz\"\n<strong>输出：</strong>\"abccdcdcdxyz\"\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 30</code></li>\n\t<li><code>s</code>&nbsp;由小写英文字母、数字和方括号&nbsp;<code>'[]'</code> 组成</li>\n\t<li><code>s</code>&nbsp;保证是一个&nbsp;<strong>有效</strong>&nbsp;的输入。</li>\n\t<li><code>s</code>&nbsp;中所有整数的取值范围为&nbsp;<code>[1, 300]</code>&nbsp;</li>\n</ul>",
  "code": "class Solution {\npublic:\n    string getDigits(string &s, size_t &ptr) {\n        string ret = \"\";\n        while (isdigit(s[ptr])) {\n            ret.push_back(s[ptr++]);\n        }\n        return ret;\n    }\n\n    string getString(vector <string> &v) {\n        string ret;\n        for (const auto &s: v) {\n            ret += s;\n        }\n        return ret;\n    }\n\n    string decodeString(string s) {\n        vector <string> stk;\n        size_t ptr = 0;\n\n        while (ptr < s.size()) {\n            char cur = s[ptr];\n            if (isdigit(cur)) {\n                // 获取一个数字并进栈\n                string digits = getDigits(s, ptr);\n                stk.push_back(digits);\n            } else if (isalpha(cur) || cur == '[') {\n                // 获取一个字母并进栈\n                stk.push_back(string(1, s[ptr++]));\n            } else {\n                ++ptr;\n                vector <string> sub;\n                while (stk.back() != \"[\") {\n                    sub.push_back(stk.back());\n                    stk.pop_back();\n                }\n                reverse(sub.begin(), sub.end());\n                // 左括号出栈\n                stk.pop_back();\n                // 此时栈顶为当前 sub 对应的字符串应该出现的次数\n                int repTime = stoi(stk.back());\n                stk.pop_back();\n                string t, o = getString(sub);\n                // 构造字符串\n                while (repTime--) t += o;\n                // 将构造好的字符串入栈\n                stk.push_back(t);\n            }\n        }\n\n        return getString(stk);\n    }\n};",
  "cards": [
   {
    "id": "p394-reptime-read-before-pop",
    "crux": "必须先用 stoi(stk.back()) 读出重复次数，再执行 pop_back()，顺序不能颠倒",
    "answer": "int repTime = stoi(stk.back());",
    "blankOffset": 1192,
    "blankLen": 31,
    "options": [
     "int repTime = stoi(stk.back());",
     "stk.pop_back();\n                int repTime = stoi(stk.back());",
     "int repTime = stoi(stk.front());"
    ],
    "why": "此时左括号已经出栈，栈顶元素就是数字 token，代码注释也写明「此时栈顶为当前 sub 对应的字符串应该出现的次数」，所以要先读栈顶再弹出，读取和弹出的顺序不能反。",
    "wrongWhy": {
     "stk.pop_back();\n                int repTime = stoi(stk.back());": "先弹出再读栈顶，会把真正的数字 token 直接丢弃，读到的其实是数字下面那个元素（可能是别的字符串或另一个数字），重复次数解析成完全错误的值。",
     "int repTime = stoi(stk.front());": "stk 是 vector 模拟的栈，back() 才是栈顶（最近入栈的数字），front() 是栈底（最早入栈的元素，通常是最外层还没处理的片段），取错位置会导致 stoi 解析出无关字符串甚至抛异常。"
    }
   },
   {
    "id": "p394-reptime-postfix-decrement",
    "crux": "while (repTime--) 必须用后缀自减，先判断非零再消耗一次，才能精确重复 repTime 次",
    "answer": "while (repTime--)",
    "blankOffset": 1343,
    "blankLen": 17,
    "options": [
     "while (repTime--)",
     "while (--repTime)",
     "while (repTime > 0)"
    ],
    "why": "repTime-- 是后缀自减，先用当前值判断是否大于 0（真值即非 0），判断完再自减，这样能保证循环体恰好执行 repTime 次，把 o 拼接 repTime 遍。",
    "wrongWhy": {
     "while (--repTime)": "前缀自减会先把 repTime 减 1 再判断，导致最终循环体只执行 repTime-1 次，比如重复 3 次的括号只会拼接 2 遍字符串，结果少一份。",
     "while (repTime > 0)": "循环体里只有 t += o，没有对 repTime 做任何自减操作，条件永远为真（只要 repTime 一开始大于 0），会陷入死循环。"
    }
   },
   {
    "id": "p394-letter-push-ptr-postincrement",
    "crux": "压入字母/左括号时要用 s[ptr++]（先取当前字符再让指针后移），不能写成 s[++ptr] 或漏掉自增",
    "answer": "stk.push_back(string(1, s[ptr++]));",
    "blankOffset": 763,
    "blankLen": 35,
    "options": [
     "stk.push_back(string(1, s[ptr++]));",
     "stk.push_back(string(1, s[++ptr]));",
     "stk.push_back(string(1, s[ptr]));"
    ],
    "why": "ptr++ 是后缀自增，先用当前 ptr 位置的字符（也就是刚判断过的 cur 对应位置）构造一个长度为 1 的字符串入栈，然后 ptr 才后移一位，指向下一个待处理字符，这样既不会重复处理当前字符，也不会跳过它。",
    "wrongWhy": {
     "stk.push_back(string(1, s[++ptr]));": "前缀自增会先把 ptr 移到下一个位置，再取字符入栈，导致压入的其实是下一个字符而不是当前 cur，当前这个字母/'[' 被直接跳过，字符串解析产生错位。",
     "stk.push_back(string(1, s[ptr]));": "少了 ptr 的自增，指针永远停在当前位置不前进，外层 while (ptr < s.size()) 循环会反复处理同一个字符，陷入死循环。"
    }
   }
  ]
 },
 {
  "id": 416,
  "title": "416. 分割等和子集",
  "category": "动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给你一个 <strong>只包含正整数 </strong>的 <strong>非空 </strong>数组 <code>nums</code> 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,5,11,5]\n<strong>输出：</strong>true\n<strong>解释：</strong>数组可以分割成 [1, 5, 5] 和 [11] 。</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3,5]\n<strong>输出：</strong>false\n<strong>解释：</strong>数组不能分割成两个元素和相等的子集。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= nums.length <= 200</code></li>\n\t<li><code>1 <= nums[i] <= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int n = nums.size();\n        if (n < 2) {\n            return false;\n        }\n        int sum = 0, maxNum = 0;\n        for (auto& num : nums) {\n            sum += num;\n            maxNum = max(maxNum, num);\n        }\n        if (sum & 1) {\n            return false;\n        }\n        int target = sum / 2;\n        if (maxNum > target) {\n            return false;\n        }\n        vector<int> dp(target + 1, 0);\n        dp[0] = true;\n        for (int i = 0; i < n; i++) {\n            int num = nums[i];\n            for (int j = target; j >= num; --j) { // 01 背包：容量倒序，保证每个数只用一次\n                dp[j] |= dp[j - num]; // 不选 num（dp[j]）或选 num（dp[j-num]）\n            }\n        }\n        return dp[target];\n    }\n};",
  "cards": [
   {
    "id": "p416-01-knapsack-reverse-loop-bound",
    "crux": "01背包内层循环必须倒序且下界含num,否则会变成完全背包或漏解",
    "answer": "j >= num; --j",
    "blankOffset": 612,
    "blankLen": 13,
    "options": [
     "j >= num; --j",
     "j >= 0; --j",
     "j = num; j <= target; ++j",
     "j > num; --j"
    ],
    "why": "01背包要求每个数只用一次，内层容量循环必须从大到小（倒序）遍历，这样更新dp[j]时用到的dp[j-num]还是本轮未选当前num时的旧状态；若改成正序，dp[j-num]可能已经被当前num更新过，等价于该数可以被重复选取，变成完全背包。同时下界必须到j>=num（含num本身），这样j==num时才能把dp[0]（凑出0，即只选num自身）转移进来。",
    "wrongWhy": {
     "j >= 0; --j": "当j<num时dp[j-num]下标会变成负数，数组越界访问，属于未定义行为，可能导致崩溃或产生错误结果，而且这些多余的迭代毫无意义。",
     "j = num; j <= target; ++j": "正序遍历时dp[j-num]可能已经是本轮用当前num更新过的新值，等价于num可以被重复选择多次，01背包变成了完全背包，可能把本该无法凑出的和误判为可以凑出。",
     "j > num; --j": "漏掉了j==num这一次转移，dp[num]无法被正确置为true（即无法表示单独选num凑出和num这种情况），可能导致原本可行的分割方案被误判为不可行。"
    }
   },
   {
    "id": "p416-dp-array-size-target-plus-1",
    "crux": "dp数组长度必须是target+1才能容纳下标target",
    "answer": "target + 1",
    "blankOffset": 472,
    "blankLen": 10,
    "options": [
     "target + 1",
     "target",
     "target - 1"
    ],
    "why": "dp[j]表示能否凑出和j，最终要访问dp[target]判断结果，所以数组下标要覆盖0到target，长度必须是target+1。",
    "wrongWhy": {
     "target": "数组长度只有target个元素，最大合法下标是target-1，访问dp[target]会越界，属于未定义行为，可能读到脏数据导致返回结果错误甚至程序崩溃。",
     "target - 1": "长度更加不足，别说dp[target]，连边界之外的很多正常转移都会越界访问，程序基本无法正确运行。"
    }
   },
   {
    "id": "p416-dp-zero-base-case-true",
    "crux": "dp[0]必须初始化为true（不选任何数即可凑出和0），否则整张dp表恒为false",
    "answer": "dp[0] = true;",
    "blankOffset": 496,
    "blankLen": 13,
    "options": [
     "dp[0] = true;",
     "dp[0] = false;",
     "dp[target] = true;"
    ],
    "why": "dp[j]表示能否从数组中选若干个数（可以一个都不选）凑出和j。不选任何数就能凑出和0，因此dp[0]必须是边界条件true；后续所有转移dp[j] |= dp[j-num]都要依赖这个初始true才能一步步推出后面的dp[j]为true。",
    "wrongWhy": {
     "dp[0] = false;": "vector创建时本来就用0（即false）填充，这行相当于什么都没做，没有设置任何真正的边界，后续所有dp[j] |= dp[j-num]的转移永远都是false |= false，整张dp表恒为false，函数永远返回false。",
     "dp[target] = true;": "把边界错误地设在了target处，而不是真正应该成立的0处，导致只要sum是偶数（即使根本无法分割）也会直接返回true，完全破坏算法正确性，同时0这个真实边界又没有被设置，后续转移也推不出正确结果。"
    }
   },
   {
    "id": "p416-max-num-prune-strict-greater",
    "crux": "剪枝条件必须是maxNum严格大于target，而不是大于等于",
    "answer": "maxNum > target",
    "blankOffset": 394,
    "blankLen": 15,
    "options": [
     "maxNum > target",
     "maxNum >= target",
     "maxNum >= sum"
    ],
    "why": "当最大元素恰好等于target时仍然可能存在合法分割方案（把这个最大元素单独作为一组，剩余元素之和正好也是target），所以剪枝条件必须是严格大于（>），maxNum==target属于可行情况，不能被提前排除。",
    "wrongWhy": {
     "maxNum >= target": "把maxNum==target这种本来合法的情况也提前判为false，例如nums=[1,1]时target=1、maxNum=1，实际可以分割成true，但用>=会被这行提前错误地返回false。",
     "maxNum >= sum": "由于maxNum本身是nums中的一个元素、sum是全部元素之和，只要还有其他非零元素，maxNum就不可能大于等于sum，这个条件几乎永远不成立，等于让这行剪枝完全失效，起不到提前排除明显不可能情况的作用。"
    }
   }
  ]
 },
 {
  "id": 437,
  "title": "437. 路径总和 III",
  "category": "二叉树",
  "difficulty": "medium",
  "descHtml": "<p>给定一个二叉树的根节点 <code>root</code> ，和一个整数 <code>targetSum</code> ，求该二叉树里节点值之和等于 <code>targetSum</code> 的 <strong>路径</strong> 的数目。</p>\n\n<p><strong>路径</strong> 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<p></p>\n\n<pre>\n<strong>输入：</strong>root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\n<strong>输出：</strong>3\n<strong>解释：</strong>和等于 8 的路径有 3 条，如图所示。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\n<strong>输出：</strong>3\n</pre>\n\n<p> </p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li>二叉树的节点个数的范围是 <code>[0,1000]</code></li>\n\t<li><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code> </li>\n\t<li><code>-1000 <= targetSum <= 1000</code> </li>\n</ul>",
  "code": "class Solution {\npublic:\n    unordered_map<long long, int> prefix;\n\n    int dfs(TreeNode *root, long long curr, int targetSum) {\n        if (!root) {\n            return 0;\n        }\n\n        int ret = 0;\n        curr += root->val;\n        if (prefix.count(curr - targetSum)) {\n            ret = prefix[curr - targetSum]; // 链上旧前缀和的个数 = 以当前节点结尾的合法路径数\n        }\n\n        prefix[curr]++;\n        ret += dfs(root->left, curr, targetSum);\n        ret += dfs(root->right, curr, targetSum);\n        prefix[curr]--; // 回溯撤销，保证表中只含根到当前节点这条链上的前缀和\n\n        return ret;\n    }\n\n    int pathSum(TreeNode* root, int targetSum) {\n        prefix[0] = 1;\n        return dfs(root, 0, targetSum);\n    }\n};",
  "cards": [
   {
    "id": "p437-prefix-root-init-value",
    "crux": "prefix[0] 初始化值必须是 1,兜住从根节点直接出发的路径",
    "answer": "1",
    "blankOffset": 634,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "targetSum"
    ],
    "why": "prefix[0]=1 表示“空前缀(还没走任何节点)”这个前缀和出现了 1 次。当某节点的 curr-targetSum 恰好等于 0(即从根到该节点的路径和恰好等于 targetSum)时,需要靠这个预置的 1 才能匹配到、把“从根出发的整条路径”计入答案。",
    "wrongWhy": {
     "0": "会导致所有“从根节点直接开始、和恰好等于 targetSum”的路径都查不到旧前缀和,被漏算。",
     "targetSum": "prefix 表存的是“某个前缀和出现的次数”,而不是目标值,填 targetSum 语义完全不对,会污染计数逻辑。"
    }
   },
   {
    "id": "p437-prefix-lookup-key-direction",
    "crux": "查表用的 key 必须是 curr - targetSum,方向不能反",
    "answer": "curr - targetSum",
    "blankOffset": 302,
    "blankLen": 16,
    "options": [
     "curr - targetSum",
     "targetSum - curr",
     "curr + targetSum"
    ],
    "why": "路径和 = 当前前缀和 curr 减去某个祖先节点处的旧前缀和 old。要让这条路径和恰好等于 targetSum,需要 curr - old = targetSum,即 old = curr - targetSum,所以必须查表里 curr - targetSum 出现的次数。",
    "wrongWhy": {
     "targetSum - curr": "方向写反了,只有当 curr 恰好等于 targetSum 时(此时两式都等于 0)才碰巧等价;一般情况下查到的是完全无关的旧前缀和计数,导致结果错误。",
     "curr + targetSum": "对应的等式变成 old = curr + targetSum,与题目要求的路径和定义不符,查出来的次数和真实答案无关。"
    }
   },
   {
    "id": "p437-prefix-backtrack-decrement",
    "crux": "回溯时必须对 prefix[curr] 做减一撤销,而不是清零或省略",
    "answer": "prefix[curr]--;",
    "blankOffset": 492,
    "blankLen": 15,
    "options": [
     "prefix[curr]--;",
     "prefix[curr] = 0;",
     "// 不做任何操作，直接 return ret;"
    ],
    "why": "DFS 结束当前节点、准备返回给父节点处理兄弟子树时,必须把这一次对 prefix[curr] 的贡献撤销,让表中只保留“根到当前节点”这条链上真实存在的前缀和计数,避免已经离开的分支残留在表里影响其他兄弟子树的统计。",
    "wrongWhy": {
     "prefix[curr] = 0;": "如果同一个前缀和 curr 在这条链的祖先节点处也出现过(计数本应大于 1),直接置 0 会把祖先仍需要用到的计数错误抹掉,导致后续兄弟子树查表时漏算路径。",
     "// 不做任何操作，直接 return ret;": "不撤销会让该前缀和一直残留在表中,之后遍历到的兄弟子树可能错误地把自己的前缀和与这条已经结束的链拼接，数出根本不存在的路径，导致答案偏大。"
    }
   },
   {
    "id": "p437-prefix-sum-type-overflow",
    "crux": "累加的前缀和变量必须用 long long,防止节点值求和溢出 int",
    "answer": "long long",
    "blankOffset": 96,
    "blankLen": 9,
    "options": [
     "long long",
     "int",
     "long"
    ],
    "why": "题目中节点值可正可负，且路径可以很长，根到某节点的前缀和累加起来可能超出 int 的表示范围；用 long long 保存 curr 并与哈希表 key 类型保持一致,才能避免溢出导致前缀和出错、进而查表查错。",
    "wrongWhy": {
     "int": "较深节点的前缀和累加容易超出 int 范围发生溢出，得到错误的 curr 值，使 curr - targetSum 的查表结果失真，路径数被算错。",
     "long": "在部分平台(如 Windows 的 LLP64 模型)long 依然只有 32 位，和 int 一样会溢出，起不到防溢出的作用，且与 unordered_map<long long,int> 的 key 类型不匹配。"
    }
   }
  ]
 },
 {
  "id": 438,
  "title": "438. 找到字符串中所有字母异位词",
  "category": "滑动窗口",
  "difficulty": "medium",
  "descHtml": "<p>给定两个字符串&nbsp;<code>s</code>&nbsp;和 <code>p</code>，找到&nbsp;<code>s</code><strong>&nbsp;</strong>中所有&nbsp;<code>p</code><strong>&nbsp;</strong>的&nbsp;<strong><span data-keyword=\"anagram\">异位词</span>&nbsp;</strong>的子串，返回这些子串的起始索引。不考虑答案输出的顺序。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例&nbsp;1:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"cbaebabacd\", p = \"abc\"\n<strong>输出: </strong>[0,6]\n<strong>解释:</strong>\n起始索引等于 0 的子串是 \"cba\", 它是 \"abc\" 的异位词。\n起始索引等于 6 的子串是 \"bac\", 它是 \"abc\" 的异位词。\n</pre>\n\n<p><strong>&nbsp;示例 2:</strong></p>\n\n<pre>\n<strong>输入: </strong>s = \"abab\", p = \"ab\"\n<strong>输出: </strong>[0,1,2]\n<strong>解释:</strong>\n起始索引等于 0 的子串是 \"ab\", 它是 \"ab\" 的异位词。\n起始索引等于 1 的子串是 \"ba\", 它是 \"ab\" 的异位词。\n起始索引等于 2 的子串是 \"ab\", 它是 \"ab\" 的异位词。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示:</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length, p.length &lt;= 3 * 10<sup>4</sup></code></li>\n\t<li><code>s</code>&nbsp;和&nbsp;<code>p</code>&nbsp;仅包含小写字母</li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        int sLen = s.size(), pLen = p.size();\n\n        if (sLen < pLen) {\n            return vector<int>();\n        }\n\n        vector<int> ans;\n        vector<int> sCount(26);\n        vector<int> pCount(26);\n        for (int i = 0; i < pLen; ++i) {\n            ++sCount[s[i] - 'a'];\n            ++pCount[p[i] - 'a'];\n        }\n\n        if (sCount == pCount) {\n            ans.emplace_back(0);\n        }\n\n        for (int i = 0; i < sLen - pLen; ++i) {\n            --sCount[s[i] - 'a'];          // 窗口右移一格：左端字符移出\n            ++sCount[s[i + pLen] - 'a'];   // 右端字符移入\n            if (sCount == pCount) {\n                ans.emplace_back(i + 1);\n            }\n        }\n\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p438-short-string-guard",
    "crux": "s 比 p 短时的提前返回条件用 < 还是 <=",
    "answer": "<",
    "blankOffset": 140,
    "blankLen": 1,
    "options": [
     "<",
     "<=",
     ">"
    ],
    "why": "只有当 s 严格短于 p 时才不可能包含任何异位词，需要提前返回空；当 sLen == pLen 时 s 本身恰好可以构成一个完整窗口，仍需继续往下统计并判断，所以条件必须用严格的 <。",
    "wrongWhy": {
     "<=": "当 sLen == pLen 时会被误判为无法形成窗口而提前返回空，丢失了对这唯一一个合法窗口（s 自身）的判断机会。",
     ">": "方向反了，s 比 p 短时反而不会提前返回，会继续执行到统计前 pLen 个字符的循环，导致对 s 的下标访问越界。"
    }
   },
   {
    "id": "p438-slide-loop-bound",
    "crux": "滑动窗口右移循环的边界用 < 还是 <=",
    "answer": "<",
    "blankOffset": 506,
    "blankLen": 1,
    "options": [
     "<",
     "<="
    ],
    "why": "起点 0 的窗口已经在循环外判断过，剩余需要判断的起点是 1 到 sLen-pLen，共 sLen-pLen 次滑动，因此循环条件用严格的 <，使 i 最大取到 sLen-pLen-1，此时 s[i+pLen] 的最大下标恰好是 sLen-1，不越界。",
    "wrongWhy": {
     "<=": "i 会多取到 sLen-pLen 这一次，此时 s[i+pLen] 的下标变成 sLen，超出字符串范围，造成越界访问。"
    }
   },
   {
    "id": "p438-anagram-start-index-offset",
    "crux": "记录异位词起点时用 i+1 还是 i",
    "answer": "i + 1",
    "blankOffset": 710,
    "blankLen": 5,
    "options": [
     "i + 1",
     "i",
     "i + pLen"
    ],
    "why": "循环体内先执行了一次窗口右移（左端字符移出、右端字符移入），此时 sCount 对应的窗口起点已经从 i 变成了 i+1，随后比较 sCount 与 pCount 相等，说的正是起点为 i+1 的这个窗口是异位词，所以要记录 i+1。",
    "wrongWhy": {
     "i": "忘记窗口已经右移了一格，仍记录滑动前的旧起点，导致答案中所有异位词的起始下标整体少 1。",
     "i + pLen": "把窗口长度当成偏移量加到 i 上，得到的下标远超实际窗口起点，记录了错误且过于靠后的位置。"
    }
   }
  ]
 },
 {
  "id": 543,
  "title": "543. 二叉树的直径",
  "category": "二叉树",
  "difficulty": "easy",
  "descHtml": "<p>给你一棵二叉树的根节点，返回该树的 <strong>直径</strong> 。</p>\n\n<p>二叉树的 <strong>直径</strong> 是指树中任意两个节点之间最长路径的 <strong>长度</strong> 。这条路径可能经过也可能不经过根节点 <code>root</code> 。</p>\n\n<p>两节点之间路径的 <strong>长度</strong> 由它们之间边数表示。</p>\n\n<p>&nbsp;</p>\n\n<p><strong class=\"example\">示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2,3,4,5]\n<strong>输出：</strong>3\n<strong>解释：</strong>3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。\n</pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>root = [1,2]\n<strong>输出：</strong>1\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li>树中节点数目在范围 <code>[1, 10<sup>4</sup>]</code> 内</li>\n\t<li><code>-100 &lt;= Node.val &lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\n    int ans;\n    int depth(TreeNode* rt){\n        if (rt == NULL) {\n            return 0; // 访问到空节点了，返回0\n        }\n        int L = depth(rt->left); // 左儿子为根的子树的深度\n        int R = depth(rt->right); // 右儿子为根的子树的深度\n        ans = max(ans, L + R + 1); // 计算d_node即L+R+1 并更新ans\n        return max(L, R) + 1; // 返回该节点为根的子树的深度\n    }\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        ans = 1;\n        depth(root);\n        return ans - 1;\n    }\n};",
  "cards": [
   {
    "id": "p543-depth-base-case-return-0",
    "crux": "空节点深度基准值应为 0，不是 1 或负数",
    "answer": "0",
    "blankOffset": 104,
    "blankLen": 1,
    "options": [
     "0",
     "1",
     "-1"
    ],
    "why": "空节点不算深度，depth 递归的基准值必须是 0，这样叶子节点算出的深度才是 max(0,0)+1=1，符合直觉。",
    "wrongWhy": {
     "1": "把空节点当成深度为1，会让所有节点的深度都多算一层，进而 L+R+1 计算的路径节点数全部偏大，直径结果整体错误。",
     "-1": "深度出现负数会破坏 max(L,R)+1 与 L+R+1 的语义，导致某些子树深度被错误压低甚至出现负的路径长度。"
    }
   },
   {
    "id": "p543-ans-update-L-R-plus-1",
    "crux": "拐点处的路径节点数是 L+R+1，不是 L+R 或 L+R+2",
    "answer": "L + R + 1",
    "blankOffset": 252,
    "blankLen": 9,
    "options": [
     "L + R + 1",
     "L + R",
     "L + R + 2"
    ],
    "why": "以当前节点为拐点的最长路径包含左子树的 L 个节点、右子树的 R 个节点，再加上当前节点自身这 1 个节点，所以是 L+R+1。",
    "wrongWhy": {
     "L + R": "漏算了拐点自身这个节点，ans 记录的路径节点数整体少 1，导致 return ans-1 后直径普遍偏小 1（例如 3 个节点的链，正确直径 2 会被算成 1）。",
     "L + R + 2": "多算了一层，相当于把当前节点重复计入两次，导致直径结果整体偏大 1。"
    }
   },
   {
    "id": "p543-return-max-plus-1",
    "crux": "子树深度是 max(L,R)+1，不是 +0 或 +2",
    "answer": "1",
    "blankOffset": 316,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "2"
    ],
    "why": "当前节点自身要计入深度，因此返回较深子树的深度再加上自己这一层。",
    "wrongWhy": {
     "0": "没有把当前节点自身计入深度，导致 depth 的返回值整体少 1，从而向上层传递的 L、R 都偏小，最终 L+R+1 算出的路径长度也偏小。",
     "2": "多算了一层，深度整体偏大 1，向上传递后 L+R+1 结果也随之偏大。"
    }
   },
   {
    "id": "p543-ans-init-value-1",
    "crux": "ans 初始值必须是 1，配合最后 ans-1 才能处理空树等边界",
    "answer": "1",
    "blankOffset": 411,
    "blankLen": 1,
    "options": [
     "1",
     "0",
     "INT_MIN"
    ],
    "why": "depth 内部只有在递归访问到非空节点时才会更新 ans；如果 root 本身就是 NULL，depth 直接返回 0，ans 不会被更新，此时必须保证初始值减 1 后仍是合法答案 0，所以初始值取 1。",
    "wrongWhy": {
     "0": "当 root 为空时 ans 永远不会被更新，最终 return ans-1 会算出 0-1=-1，得到不合法的负直径，而正确答案应是 0。",
     "INT_MIN": "同样在 root 为空时 ans 不会被更新，最终会返回一个极大的负数（INT_MIN-1 还可能溢出），结果完全错误。"
    }
   }
  ]
 },
 {
  "id": 560,
  "title": "560. 和为 K 的子数组",
  "category": "子串",
  "difficulty": "medium",
  "descHtml": "<p>给你一个整数数组 <code>nums</code> 和一个整数&nbsp;<code>k</code> ，请你统计并返回 <em>该数组中和为&nbsp;<code>k</code><strong>&nbsp;</strong>的子数组的个数&nbsp;</em>。</p>\n\n<p>子数组是数组中元素的连续非空序列。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,1,1], k = 2\n<strong>输出：</strong>2\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>nums = [1,2,3], k = 3\n<strong>输出：</strong>2\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>\n\t<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>\n\t<li><code>-10<sup>7</sup> &lt;= k &lt;= 10<sup>7</sup></code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> mp;\n        mp[0] = 1; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组\n        int count = 0, pre = 0;\n        for (auto& x: nums) {\n            pre += x;\n            if (mp.find(pre - k) != mp.end()) { // 先查后存，k=0 时不会把自己算进去\n                count += mp[pre - k];\n            }\n            mp[pre]++;\n        }\n        return count;\n    }\n};",
  "cards": [
   {
    "id": "p560-prefix-sum-zero-init",
    "crux": "哈希表必须预置 mp[0]=1，兜住从下标0开始、前缀和恰好等于k的子数组，否则会漏计",
    "answer": "mp[0] = 1; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组",
    "blankOffset": 117,
    "blankLen": 41,
    "options": [
     "mp[0] = 1; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组",
     "mp[0] = 0; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组",
     "// 不初始化 mp[0]，遍历中按需插入",
     "mp[1] = 1;"
    ],
    "why": "solutionText 明确指出「关键是预置 mp[0]=1，否则漏掉从下标 0 开始的子数组」：当某个前缀和 pre 恰好等于 k 时，需要 pre-k=0 能在表里查到一次计数，代表「空前缀」这个虚拟状态，对应从下标0开始的子数组。",
    "wrongWhy": {
     "mp[0] = 0; // 前缀和 0 出现 1 次，兜住从下标 0 开始的子数组": "把出现次数设为0等价于没有预置该计数，查到 pre-k=0 时累加的是0，从下标0开始、和为k的子数组会被漏算。",
     "// 不初始化 mp[0]，遍历中按需插入": "不预置的话，遍历过程中 mp[0] 只有在某次 pre 恰好为0时才会被插入且发生在查询之后，第一次查询 pre-k=0 时表里还没有这一项，同样会漏算从下标0开始的子数组。",
     "mp[1] = 1;": "预置的是前缀和为1这个不存在的虚拟状态，跟“空前缀对应前缀和0”的语义对不上，无法兜住从下标0开始的子数组，反而可能引入错误计数。"
    }
   },
   {
    "id": "p560-check-before-store-order",
    "crux": "必须先查 mp[pre-k] 再执行 mp[pre]++，顺序颠倒会在 k=0 时把当前元素自身算进答案",
    "answer": "if (mp.find(pre - k) != mp.end()) { // 先查后存，k=0 时不会把自己算进去\n                count += mp[pre - k];\n            }\n            mp[pre]++;",
    "blankOffset": 255,
    "blankLen": 132,
    "options": [
     "if (mp.find(pre - k) != mp.end()) { // 先查后存，k=0 时不会把自己算进去\n                count += mp[pre - k];\n            }\n            mp[pre]++;",
     "mp[pre]++;\n            if (mp.find(pre - k) != mp.end()) {\n                count += mp[pre - k];\n            }",
     "if (mp.find(pre - k) != mp.end()) {\n                count += mp[pre - k];\n            }"
    ],
    "why": "solutionText 与 hints 都强调「先查后存」：先用当前 pre 去查表中已有的 pre-k 计数（此时表里还不包含当前这个 pre），再把 pre 计入表。这样当 k=0 时，当前这一步产生的 pre 不会把自己算作一次匹配，避免把空子数组重复计数。",
    "wrongWhy": {
     "mp[pre]++;\n            if (mp.find(pre - k) != mp.end()) {\n                count += mp[pre - k];\n            }": "先执行 mp[pre]++ 再查询，会把当前元素自己刚存入的 pre 也计入表中；当 k=0 时 pre-k 就是 pre 本身，查询会命中自己，导致把长度为0的“子数组”错误地多算一次，count 偏大。",
     "if (mp.find(pre - k) != mp.end()) {\n                count += mp[pre - k];\n            }": "漏掉了 mp[pre]++，当前前缀和 pre 没有被计入哈希表，后续遍历再遇到需要匹配这个 pre 的位置时查不到，会导致漏算子数组，最终 count 偏小。"
    }
   }
  ]
 },
 {
  "id": 739,
  "title": "739. 每日温度",
  "category": "栈",
  "difficulty": "medium",
  "descHtml": "<p>给定一个整数数组&nbsp;<code>temperatures</code>&nbsp;，表示每天的温度，返回一个数组&nbsp;<code>answer</code>&nbsp;，其中&nbsp;<code>answer[i]</code>&nbsp;是指对于第 <code>i</code> 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用&nbsp;<code>0</code> 来代替。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [73,74,75,71,69,72,76,73]\n<strong>输出:</strong>&nbsp;[1,1,4,2,1,1,0,0]\n</pre>\n\n<p><strong>示例 2:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [30,40,50,60]\n<strong>输出:</strong>&nbsp;[1,1,1,0]\n</pre>\n\n<p><strong>示例 3:</strong></p>\n\n<pre>\n<strong>输入:</strong> temperatures = [30,60,90]\n<strong>输出: </strong>[1,1,0]</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;=&nbsp;temperatures.length &lt;= 10<sup>5</sup></code></li>\n\t<li><code>30 &lt;=&nbsp;temperatures[i]&nbsp;&lt;= 100</code></li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> ans(n);\n        stack<int> s; // 存下标，栈内温度从底到顶递减：都是还没等到更高温度的日子\n        for (int i = 0; i < n; ++i) {\n            while (!s.empty() && temperatures[i] > temperatures[s.top()]) {\n                int previousIndex = s.top();\n                ans[previousIndex] = i - previousIndex; // i 是它右边第一个更高温度的下标\n                s.pop();\n            }\n            s.push(i);\n        }\n        return ans;\n    }\n};",
  "cards": [
   {
    "id": "p739-monotonic-stack-strict-greater",
    "crux": "单调栈弹栈条件必须是严格大于，否则相等温度会被误判",
    "answer": ">",
    "blankOffset": 294,
    "blankLen": 1,
    "options": [
     ">",
     ">=",
     "<",
     "<="
    ],
    "why": "栈内维护的是「还没等到更高温度的日子」，只有当前温度严格高于栈顶下标对应的温度时，才说明栈顶那天等到了更高温度，可以弹出并计算天数；用严格大于才能保证语义正确。",
    "wrongWhy": {
     ">=": "相同温度会被误判为「更高」而提前弹栈，导致把并未真正遇到更高温度的日子标记为已完成，等待天数计算错误",
     "<": "条件方向完全反了，会在当前温度更低时才弹栈，栈内单调性被打反，算法逻辑整体错误，无法得到「下一个更大元素」",
     "<=": "同样方向反了，且包含相等情况，弹栈时机与本意完全相反，结果全错"
    }
   },
   {
    "id": "p739-wait-days-index-diff",
    "crux": "等待天数用当前下标减去被弹出下标，顺序不能反",
    "answer": "previousIndex",
    "blankOffset": 407,
    "blankLen": 13,
    "options": [
     "previousIndex",
     "i",
     "previousIndex + 1"
    ],
    "why": "i 是右边第一个比 previousIndex 温度更高的下标，等待天数就是两下标之差 i - previousIndex；previousIndex 在 pop 之前已经取出保存，减法顺序不能颠倒。",
    "wrongWhy": {
     "i": "写成 i - i 恒为 0，无论实际等待多少天答案都变成 0，完全丢失结果",
     "previousIndex + 1": "相当于少算一天，等待天数比真实值小 1，所有非零答案都会偏小"
    }
   },
   {
    "id": "p739-loop-bound-strict-less-n",
    "crux": "遍历下标必须用 i < n，不能越界也不能少遍历最后一天",
    "answer": "i < n",
    "blankOffset": 231,
    "blankLen": 5,
    "options": [
     "i < n",
     "i <= n",
     "i < n - 1"
    ],
    "why": "n 是数组长度，合法下标范围是 [0, n-1]，用 i < n 才能恰好遍历完所有下标且不越界。",
    "wrongWhy": {
     "i <= n": "当 i == n 时会访问 temperatures[n] 和把 n 压入栈，数组越界，属于未定义行为",
     "i < n - 1": "最后一个下标 n-1 永远不会被当作「当前温度」处理，导致它既无法弹出比它矮的栈顶，也可能漏掉本应产生的答案"
    }
   }
  ]
 },
 {
  "id": 763,
  "title": "763. 划分字母区间",
  "category": "贪心算法",
  "difficulty": "medium",
  "descHtml": "<p>给你一个字符串 <code>s</code> 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串&nbsp;<code>\"ababcc\"</code> 能够被分为 <code>[\"abab\", \"cc\"]</code>，但类似&nbsp;<code>[\"aba\", \"bcc\"]</code> 或&nbsp;<code>[\"ab\", \"ab\", \"cc\"]</code> 的划分是非法的。</p>\n\n<p>注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 <code>s</code> 。</p>\n\n<p>返回一个表示每个字符串片段的长度的列表。</p>\n\n<p>&nbsp;</p>\n<strong class=\"example\">示例 1：</strong>\n\n<pre>\n<strong>输入：</strong>s = \"ababcbacadefegdehijhklij\"\n<strong>输出：</strong>[9,7,8]\n<strong>解释：</strong>\n划分结果为 \"ababcbaca\"、\"defegde\"、\"hijhklij\" 。\n每个字母最多出现在一个片段中。\n像 \"ababcbacadefegde\", \"hijhklij\" 这样的划分是错误的，因为划分的片段数较少。 </pre>\n\n<p><strong class=\"example\">示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>s = \"eccbbbbdec\"\n<strong>输出：</strong>[10]\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 &lt;= s.length &lt;= 500</code></li>\n\t<li><code>s</code> 仅由小写英文字母组成</li>\n</ul>",
  "code": "class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        int last[26]; // 每个字母最后一次出现的下标\n        int length = s.size();\n        for (int i = 0; i < length; i++) {\n            last[s[i] - 'a'] = i;\n        }\n        vector<int> partition;\n        int start = 0, end = 0;\n        for (int i = 0; i < length; i++) {\n            end = max(end, last[s[i] - 'a']); // 当前段必须至少延伸到段内每个字母的最后出现位置\n            if (i == end) {\n                partition.push_back(end - start + 1);\n                start = end + 1;\n            }\n        }\n        return partition;\n    }\n};",
  "cards": [
   {
    "id": "p763-end-max-extend",
    "crux": "当前段的右端点必须用 max 不断扩展到已出现字母的最远位置，不能直接赋值覆盖",
    "answer": "end = max(end, last[s[i] - 'a'])",
    "blankOffset": 344,
    "blankLen": 32,
    "options": [
     "end = max(end, last[s[i] - 'a'])",
     "end = last[s[i] - 'a']",
     "end = min(end, last[s[i] - 'a'])",
     "end = max(end, last[s[i]])"
    ],
    "why": "段内已经出现过的字母的 last 位置可能比当前字符的 last 更远，必须取 max 才能保证段不断向右扩展到能覆盖所有已出现字母的最后位置，否则段会提前错误闭合，导致同一字母被拆到两段。",
    "wrongWhy": {
     "end = last[s[i] - 'a']": "直接赋值会丢失之前已经扩展出去的更大的 end，可能使 end 变小，导致段提前(或错误地)闭合，把本该同段的字母拆分到不同段。",
     "end = min(end, last[s[i] - 'a'])": "用 min 会让 end 只会缩小不会扩展，完全违背贪心思路，无法保证段覆盖所有已出现字母的最后位置。",
     "end = max(end, last[s[i]])": "忘记减去 'a' 做映射，last 数组下标越界（用字符的 ASCII 值直接当下标），会导致数组越界访问，程序行为未定义。"
    }
   },
   {
    "id": "p763-segment-length-plus-one",
    "crux": "段长度是闭区间 [start, end] 的长度，必须是 end - start + 1",
    "answer": "partition.push_back(end - start + 1)",
    "blankOffset": 449,
    "blankLen": 36,
    "options": [
     "partition.push_back(end - start + 1)",
     "partition.push_back(end - start)",
     "partition.push_back(end + start + 1)",
     "partition.push_back(end - start - 1)"
    ],
    "why": "[start, end] 是闭区间下标范围，元素个数需要 +1（例如 start=0,end=0 时长度应为1），漏掉 +1 会少算一个字符，导致长度总和小于原字符串长度。",
    "wrongWhy": {
     "partition.push_back(end - start)": "闭区间长度少算 1，导致该段长度比实际短一位，所有段长度加起来会小于原字符串总长度。",
     "partition.push_back(end + start + 1)": "把减法误写成加法，长度值会随 start 增大而错误增大，与实际段长完全无关。",
     "partition.push_back(end - start - 1)": "把 +1 误写成 -1，闭区间长度反而比实际少算 2（单字符段 start==end 时结果为 -1），段长严重错误。"
    }
   },
   {
    "id": "p763-start-move-to-end-plus-one",
    "crux": "切段后 start 必须移动到 end + 1，跳过整个已处理段",
    "answer": "start = end + 1",
    "blankOffset": 503,
    "blankLen": 15,
    "options": [
     "start = end + 1",
     "start = end",
     "start = end + 2",
     "start = start + 1"
    ],
    "why": "当前段的最后一个下标是 end，下一段必须从 end 的下一个位置开始，所以 start 要更新为 end + 1；这样才能保证段与段之间既不重叠也不遗漏字符。",
    "wrongWhy": {
     "start = end": "少加 1，导致新段的 start 与上一段的最后一个下标重合，该字符会被重复计入两段，破坏段长总和与原字符串长度的对应关系。",
     "start = end + 2": "多跳 1 位，跳过了 end 紧邻的下一个字符，使该字符被整段漏掉，段与段之间出现空隙，长度总和小于原字符串。",
     "start = start + 1": "start 没有跳到 end 之后，而只前进了 1 步，导致下一段会把已经处理过的字符重新计入，段划分完全错误。"
    }
   }
  ]
 },
 {
  "id": 994,
  "title": "994. 腐烂的橘子",
  "category": "图论",
  "difficulty": "medium",
  "descHtml": "<p>在给定的&nbsp;<code>m x n</code>&nbsp;网格&nbsp;<code>grid</code>&nbsp;中，每个单元格可以有以下三个值之一：</p>\n\n<ul>\n\t<li>值&nbsp;<code>0</code>&nbsp;代表空单元格；</li>\n\t<li>值&nbsp;<code>1</code>&nbsp;代表新鲜橘子；</li>\n\t<li>值&nbsp;<code>2</code>&nbsp;代表腐烂的橘子。</li>\n</ul>\n\n<p>每分钟，腐烂的橘子&nbsp;<strong>周围&nbsp;4 个方向上相邻</strong> 的新鲜橘子都会腐烂。</p>\n\n<p>返回 <em>直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回&nbsp;<code>-1</code></em>&nbsp;。</p>\n\n<p>&nbsp;</p>\n\n<p><strong>示例 1：</strong></p>\n\n<p><strong></strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[2,1,1],[1,1,0],[0,1,1]]\n<strong>输出：</strong>4\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[2,1,1],[0,1,1],[1,0,1]]\n<strong>输出：</strong>-1\n<strong>解释：</strong>左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>grid = [[0,2]]\n<strong>输出：</strong>0\n<strong>解释：</strong>因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。\n</pre>\n\n<p>&nbsp;</p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>m == grid.length</code></li>\n\t<li><code>n == grid[i].length</code></li>\n\t<li><code>1 &lt;= m, n &lt;= 10</code></li>\n\t<li><code>grid[i][j]</code> 仅为&nbsp;<code>0</code>、<code>1</code>&nbsp;或&nbsp;<code>2</code></li>\n</ul>",
  "code": "class Solution {\n    int cnt;\n    int dis[10][10];\n    int dir_x[4] = {0, 1, 0, -1};\n    int dir_y[4] = {1, 0, -1, 0};\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        queue<pair<int, int>>Q;\n        memset(dis, -1, sizeof(dis));\n        cnt = 0;\n        int n = (int)grid.size(), m = (int)grid[0].size(), ans = 0;\n        for (int i = 0; i < n; ++i) {\n            for (int j = 0; j < m; ++j) {\n                if (grid[i][j] == 2) {\n                    Q.emplace(i, j); // 所有腐烂橘子同时入队：多源 BFS\n                    dis[i][j] = 0;\n                }\n                else if (grid[i][j] == 1) {\n                    cnt += 1;\n                }\n            }\n        }\n        while (!Q.empty()){\n            auto [r, c] = Q.front();\n            Q.pop();\n            for (int i = 0; i < 4; ++i) {\n                int tx = r + dir_x[i];\n                int ty = c + dir_y[i];\n                if (tx < 0|| tx >= n || ty < 0|| ty >= m || ~dis[tx][ty] || !grid[tx][ty]) { // 越界 / 已访问(~dis 非零) / 空格子都跳过\n                    continue;\n                }\n                dis[tx][ty] = dis[r][c] + 1;\n                Q.emplace(tx, ty);\n                if (grid[tx][ty] == 1) {\n                    cnt -= 1;\n                    ans = dis[tx][ty];\n                    if (!cnt) {\n                        break;\n                    }\n                }\n            }\n        }\n        return cnt ? -1 : ans;\n    }\n};",
  "cards": [
   {
    "id": "p994-rotten-oranges-visited-check",
    "crux": "用 ~dis[tx][ty] 判断格子是否已访问（-1 取反为 0/假，其余取反为非 0/真）",
    "answer": "~dis[tx][ty]",
    "blankOffset": 946,
    "blankLen": 12,
    "options": [
     "~dis[tx][ty]",
     "dis[tx][ty] == -1",
     "dis[tx][ty] < 0",
     "dis[tx][ty]"
    ],
    "why": "dis 数组初值为 -1 表示未访问，感染时被写成非负的分钟数。~(-1) 在补码下等于 0（假），~非 -1 的值必为非零（真），所以 ~dis[tx][ty] 恰好等价于「已访问则跳过」；这是本题里最容易看错方向的位运算技巧。",
    "wrongWhy": {
     "dis[tx][ty] == -1": "把跳过条件写反：这表示「未访问就跳过」，导致所有格子都不会被真正处理，BFS 无法向外扩散。",
     "dis[tx][ty] < 0": "同样是把条件方向搞反，等价于「未访问才跳过」，会让新鲜橘子永远不会被感染。",
     "dis[tx][ty]": "漏掉按位取反：-1 在布尔上下文中是非零（真），会被误判为「已访问」而跳过几乎所有未访问格子，只有 dis 恰好为 0 的格子例外，BFS 基本无法推进。"
    }
   },
   {
    "id": "p994-rotten-oranges-dis-init",
    "crux": "dis 数组必须初始化为 -1 作为「未访问」哨兵值，不能用 0",
    "answer": "-1",
    "blankOffset": 231,
    "blankLen": 2,
    "options": [
     "-1",
     "0",
     "1",
     "0x3f"
    ],
    "why": "题解用 dis 是否等于 -1 来区分「未访问」和「已访问（含距离 0 的腐烂源）」，源格子的距离本身就是 0，所以哨兵值不能和合法距离值 0 冲突，必须用 -1。",
    "wrongWhy": {
     "0": "0 恰好和腐烂源的初始距离相同，会让所有格子在还没访问前就被误判为“已访问”，后续 ~dis[tx][ty] 判断彻底失效。",
     "1": "memset 按字节填充，1 会把每个 int 填成 0x01010101（非 -1 也非 0 的脏值），既不能正确代表未访问，也破坏了 dis 的距离语义。",
     "0x3f": "同样是按字节填充成一个很大的正数而非 -1，虽然数值上像“无穷大”，但与本题「-1 表示未访问」的判断逻辑不匹配，~dis 的取反技巧会失效。"
    }
   },
   {
    "id": "p994-rotten-oranges-dis-transfer",
    "crux": "新感染格子的距离要基于当前出队格子 (r, c) 的 dis 加 1，而不是别的来源",
    "answer": "dis[r][c] + 1",
    "blankOffset": 1087,
    "blankLen": 13,
    "options": [
     "dis[r][c] + 1",
     "dis[r][c]",
     "dis[tx][ty] + 1",
     "dis[r][c] - 1"
    ],
    "why": "BFS 按层扩散，(tx, ty) 是从 (r, c) 走一步过去的，所以它的感染时刻应该是 (r, c) 的时刻再加 1 分钟，这样 dis 数组才能正确记录“第几分钟被感染”。",
    "wrongWhy": {
     "dis[r][c]": "少加了这一步的时间增量，会让新感染格子和它的来源格子记同一个时刻，最终 ans 取到的最短时间偏小，答案错误。",
     "dis[tx][ty] + 1": "dis[tx][ty] 此时还是初始值 -1（尚未赋值），用它自己的旧值来计算会得到 0，彻底丢失了真实的层数信息。",
     "dis[r][c] - 1": "方向反了，扩散一层时间应该递增而不是递减，会让距离越传越小甚至出现负数，破坏 BFS 的层次含义。"
    }
   }
  ]
 },
 {
  "id": 1143,
  "title": "1143. 最长公共子序列",
  "category": "多维动态规划",
  "difficulty": "medium",
  "descHtml": "<p>给定两个字符串 <code>text1</code> 和 <code>text2</code>，返回这两个字符串的最长 <strong>公共子序列</strong> 的长度。如果不存在 <strong>公共子序列</strong> ，返回 <code>0</code> 。</p>\n\n<p>一个字符串的 <strong>子序列</strong><em> </em>是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。</p>\n\n<ul>\n\t<li>例如，<code>\"ace\"</code> 是 <code>\"abcde\"</code> 的子序列，但 <code>\"aec\"</code> 不是 <code>\"abcde\"</code> 的子序列。</li>\n</ul>\n\n<p>两个字符串的 <strong>公共子序列</strong> 是这两个字符串所共同拥有的子序列。</p>\n\n<p> </p>\n\n<p><strong>示例 1：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abcde\", text2 = \"ace\" \n<strong>输出：</strong>3  \n<strong>解释：</strong>最长公共子序列是 \"ace\" ，它的长度为 3 。\n</pre>\n\n<p><strong>示例 2：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abc\", text2 = \"abc\"\n<strong>输出：</strong>3\n<strong>解释：</strong>最长公共子序列是 \"abc\" ，它的长度为 3 。\n</pre>\n\n<p><strong>示例 3：</strong></p>\n\n<pre>\n<strong>输入：</strong>text1 = \"abc\", text2 = \"def\"\n<strong>输出：</strong>0\n<strong>解释：</strong>两个字符串没有公共子序列，返回 0 。\n</pre>\n\n<p> </p>\n\n<p><strong>提示：</strong></p>\n\n<ul>\n\t<li><code>1 <= text1.length, text2.length <= 1000</code></li>\n\t<li><code>text1</code> 和 <code>text2</code> 仅由小写英文字符组成。</li>\n</ul>",
  "code": "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m = text1.length(), n = text2.length();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1)); // dp[i][j]：text1 前 i 个与 text2 前 j 个的 LCS 长度\n        for (int i = 1; i <= m; i++) {\n            char c1 = text1.at(i - 1);\n            for (int j = 1; j <= n; j++) {\n                char c2 = text2.at(j - 1);\n                if (c1 == c2) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};",
  "cards": [
   {
    "id": "p1143-dp-table-size-plus-one",
    "crux": "dp 数组要开 (m+1)x(n+1)，多一行一列表示空串前缀",
    "answer": "m + 1, vector<int>(n + 1)",
    "blankOffset": 171,
    "blankLen": 25,
    "options": [
     "m + 1, vector<int>(n + 1)",
     "m, vector<int>(n)",
     "m + 1, vector<int>(n)",
     "n + 1, vector<int>(m + 1)"
    ],
    "why": "solutionText 明确指出：dp 比字符串各多一行一列，第 0 行/列表示空串，天然为 0，作为递归基；开 m x n 会丢失这个空串边界，导致 i-1/j-1 访问越界或状态定义错位。",
    "wrongWhy": {
     "m, vector<int>(n)": "整张表只有 m 行 n 列（合法下标 0..m-1、0..n-1），但循环 i、j 一直取到 m、n，dp[m][n] 会越界；而且缺了表示空串的第 0 行第 0 列这一递归基，边界初值 0 无从体现。",
     "m + 1, vector<int>(n)": "只在 text1 方向多留一行，text2 方向少了空串列，j 循环到 n 时 dp[i][n] 越界（数组只有 n 列，合法下标 0..n-1）。",
     "n + 1, vector<int>(m + 1)": "把行数用 n、列数用 m，行列维度与后续 dp[i][j]（i 对应 text1 长度 m、j 对应 text2 长度 n）的使用方式相反，m>n 时 i 循环到 m 会越界访问只有 n+1 行的 dp。"
    }
   },
   {
    "id": "p1143-text1-char-index-i-minus-1",
    "crux": "取 text1 第 i 个字符要用下标 i-1（0-based 串 vs 1-based dp 行号）",
    "answer": "i - 1",
    "blankOffset": 314,
    "blankLen": 5,
    "options": [
     "i - 1",
     "i",
     "i + 1"
    ],
    "why": "solutionText 指出 dp[i][j] 对应的字符是 text1[i-1] 和 text2[j-1]，因为 dp 的行号 i 是 1-based（第 i 个字符），而字符串本身是 0-based，所以要减 1 才能取到对应字符。",
    "wrongWhy": {
     "i": "当 i = m 时 text1.at(m) 越界（合法下标是 0..m-1），且 i=1 时会误取到 text1[1]（第二个字符）而不是第一个字符，整个转移全部错位。",
     "i + 1": "相对正确下标 i-1 多偏移了 2，i=1 时取到 text1.at(2)（第三个字符）而非第一个，dp[i][j] 与 text1 前 i 个字符的对应关系全乱；且 i=m 时 text1.at(m+1) 必然越界。"
    }
   },
   {
    "id": "p1143-text2-char-index-j-minus-1",
    "crux": "取 text2 第 j 个字符同样要用下标 j-1",
    "answer": "j - 1",
    "blankOffset": 400,
    "blankLen": 5,
    "options": [
     "j - 1",
     "j",
     "j + 1"
    ],
    "why": "与 text1 同理，dp[i][j] 对应 text2 前 j 个字符里的第 j 个，字符串下标要减 1 才能对齐 1-based 的 dp 列号 j。",
    "wrongWhy": {
     "j": "j = n 时 text2.at(n) 越界；且所有比较都错位一个字符，导致最长公共子序列计算完全错误。",
     "j + 1": "相对正确下标 j-1 多偏移了 2，j=1 起就取错字符；且 j=n 时 text2.at(n+1) 必然越界抛异常。"
    }
   },
   {
    "id": "p1143-lcs-match-transfer",
    "crux": "字符相等时状态转移必须来自左上角 dp[i-1][j-1]",
    "answer": "dp[i - 1][j - 1] + 1",
    "blankOffset": 471,
    "blankLen": 20,
    "options": [
     "dp[i - 1][j - 1] + 1",
     "dp[i][j] + 1",
     "dp[i - 1][j] + 1",
     "dp[i][j - 1] + 1"
    ],
    "why": "solutionText：末尾字符相等时取 dp[i-1][j-1]+1，即两个串都各自往前退一位（跳过这对匹配的字符）后的 LCS 长度加上当前这一对匹配字符。",
    "wrongWhy": {
     "dp[i][j] + 1": "dp[i][j] 此时还是未赋值/默认值（一般是 0，因为 vector 默认初始化为 0），会导致所有匹配长度都变成 1，无法正确累加。",
     "dp[i - 1][j] + 1": "只让 text1 前进一位而 text2 没有对齐地退一位，相当于把一个未匹配位置的最优值当成匹配基础，会重复计数或漏算字符。",
     "dp[i][j - 1] + 1": "同理只让 text2 退一位、text1 没退，字符匹配的两个下标没有同步回退，结果会比真实 LCS 偏大。"
    }
   },
   {
    "id": "p1143-lcs-mismatch-transfer",
    "crux": "字符不相等时取跳过任一字符后的较大值 max(dp[i-1][j], dp[i][j-1])",
    "answer": "max(dp[i - 1][j], dp[i][j - 1])",
    "blankOffset": 549,
    "blankLen": 31,
    "options": [
     "max(dp[i - 1][j], dp[i][j - 1])",
     "max(dp[i - 1][j - 1], dp[i][j])",
     "dp[i - 1][j - 1]",
     "max(dp[i][j - 1], dp[i - 1][j] + 1)"
    ],
    "why": "solutionText：末尾字符不相等时取 max(dp[i-1][j], dp[i][j-1])，即分别尝试丢弃 text1 的第 i 个字符或丢弃 text2 的第 j 个字符，取两种情况中较优的一个。",
    "wrongWhy": {
     "max(dp[i - 1][j - 1], dp[i][j])": "dp[i-1][j-1] 同时丢弃两个不相等的字符，会漏掉『只丢一个字符』这种可能更优的情况；dp[i][j] 又是自身未赋值的值，逻辑上不成立。",
     "dp[i - 1][j - 1]": "只考虑同时退两步的情况，遗漏了『保留其中一个字符继续匹配』的可能性，会导致结果偏小。",
     "max(dp[i][j - 1], dp[i - 1][j] + 1)": "凭空给 dp[i-1][j] 加了 1，相当于把不匹配的字符也当成匹配来计数，会使结果偏大且逻辑与『字符不相等』的前提矛盾。"
    }
   },
   {
    "id": "p1143-lcs-final-return",
    "crux": "最终答案是 dp[m][n]，即两个串全长对应的格子",
    "answer": "dp[m][n]",
    "blankOffset": 639,
    "blankLen": 8,
    "options": [
     "dp[m][n]",
     "dp[m - 1][n - 1]",
     "dp[m][n - 1]",
     "dp[m - 1][n]"
    ],
    "why": "dp[i][j] 定义为 text1 前 i 个字符与 text2 前 j 个字符的 LCS 长度，两个串的全长分别是 m 和 n，所以最终答案在 dp[m][n]，对应 hints 里最后一句『最后返回 dp[m][n]』。",
    "wrongWhy": {
     "dp[m - 1][n - 1]": "把 1-based 的 dp 下标误当成 0-based 的字符串下标，实际会漏掉两个串最后一个字符参与的比较结果，返回的不是全串的 LCS。",
     "dp[m][n - 1]": "只用了 text2 的前 n-1 个字符，等于漏掉了 text2 的最后一个字符，可能导致漏算一段公共子序列。",
     "dp[m - 1][n]": "只用了 text1 的前 m-1 个字符，漏掉 text1 最后一个字符可能参与的匹配，结果可能比真实答案小。"
    }
   }
  ]
 }
];
