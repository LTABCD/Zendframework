<?php
	class Application_Model_Studio extends Zend_Db_Table{
		protected $_name="dwbs_studio";
		protected $_primary="id";
		
		public function dqlOperation($val){
			$db=$this->getAdapter();
			$where=$db->quoteInto('province=?',$val)
					.$db->quoteInto('or city=?',$val);
			$row=$this->fetchAll($where)->toArray();
			return $row;
		}
		public function cityOperation($val){
			$db=$this->getAdapter();
			$select=$db->select();
			$select->from($this->_name,"city");
			$select->where('province=?',$val);
			$select->group('city');
			$row=$db->fetchAll($select);
			return $row;
		}
		public function provinceOperation(){
			$db=$this->getAdapter();
			$select=$db->select();
			$select->from($this->_name,"province");
			$select->group('province');
			$row=$db->fetchAll($select);
			return $row;
		}
	}
?>