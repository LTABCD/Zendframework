<?php
	class Application_Model_Experience extends Zend_Db_Table{
		protected $_name="dwbs_experience";
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
		public function limitOperation($page){
			$db=$this->getAdapter();
			$select=$db->select();
			$select->from($this->_name,"*");
			$select->limit(5,($page-1)*5);
			$row=$db->fetchAll($select);
			return $row;
		}
		public function countOperation(){
			$db=$this->getAdapter();
			$select=$db->select();
			$select->from($this->_name,"count(id)");
			$row=$db->fetchAll($select);
			return $row;
		}
		public function likeOperation($val){
			$db=$this->getAdapter();
			$sql= $db->quoteInto(
			    'SELECT * FROM dwbs_experience WHERE address like ?',
			    '%'.$val.'%'
			);
			$res=$db->query($sql)->fetchAll();
			return $res;
		}
	}
	
?>